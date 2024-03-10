# frozen_string_literal: true

class Server
  require "rack"
  require_relative "server/puma"
  require_relative "server/gzip"
  require_relative "server/etag"
  require_relative "server/dir"

  def self.app(path)
    Rack::Builder.app do
      use Server::ETag
      run Server::Dir.new(path)
    end
  end

  def self.for_dir(path, options = {})
    host = options.delete(:host) || "127.0.0.1"
    port = options.delete(:port) || 7777
    new app(path), options.merge!(
      binds: ["tcp://#{host}:#{port}"],
      tcp_host: host,
      tcp_port: port
    )
  end

  def initialize(app, options = {})
    @app = app
    @options = default_options.merge!(options)
    @events = Puma::Events.new
    @server = Puma::Server.new(@app, @events, @options)
  end

  def start(block: false)
    @server.binder.parse(@options[:binds])
    thr = @server.run
    block ? thr.join : thr
  end

  def stop
    @server.stop
  end

  private

  def default_options
    {
      supported_http_methods: %w[GET HEAD],
      min_threads: 1,
      max_threads: 5,
      workers: 1
    }
  end
end

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
    new(app(path), options)
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
      tcp_host: "127.0.0.1",
      tcp_port: 7777,
      binds: ["tcp://127.0.0.1:7777"],
      supported_http_methods: %w[GET HEAD],
      min_threads: 1,
      max_threads: 5,
      workers: 1
    }
  end
end

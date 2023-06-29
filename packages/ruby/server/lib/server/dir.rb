# frozen_string_literal: true

##
# A rack application that serves the contents
# of a directory over HTTP.
class Server::Dir
  prepend Server::Gzip

  def initialize(root)
    @root = File.realpath(root)
  end

  def call(env)
    finish Rack::Request.new(env)
  rescue Errno::EPERM, Errno::EACCES
    body = "Permission denied"
    [403, {"content-length" => body.bytesize, "content-type" => "text/plain"}, [body]]
  rescue Errno::ENOENT
    body = "The requested URL was not found"
    [404, {"content-length" => body.bytesize, "content-type" => "text/plain"}, [body]]
  rescue => ex
    body = "Internal server error (#{ex.class})"
    [500, {"content-length" => body.bytesize, "content-type" => "text/plain"}, [body]]
  end

  private

  attr_reader :root

  def finish(request)
    path = find_path(request)
    body = File.binread(path)
    extn = File.extname(path)
    [
      200,
      {"content-type" => mime_types[extn] || Rack::Mime.mime_type(extn),
       "content-length" => body.bytesize},
      body.each_line
    ]
  end

  def find_path(request)
    path = File.join root, File.expand_path(request.path)
    File.directory?(path) ? File.join(path, "index.html") : path
  end

  def mime_types
    {".ttf" => "font/ttf"}.freeze
  end
end

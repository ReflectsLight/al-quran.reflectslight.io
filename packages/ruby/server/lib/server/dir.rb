# frozen_string_literal: true

class Server::Dir
  def initialize(root)
    @root = File.realpath(root)
  end

  def call(env)
    req = Rack::Request.new(env)
    headers = Rack::Headers.new(env)
    h, body = read(local_path(req.path))
    [200, headers.merge!(h), body]
  rescue Errno::EPERM, Errno::EACCES
    body = "Permission denied"
    [403, {"content-length" => body.bytesize, "content-type" => "text/plain"}, [body]]
  rescue Errno::ENOENT
    body = "The requested URL was not found"
    [404, {"content-length" => body.bytesize, "content-type" => "text/plain"}, [body]]
  end

  private

  attr_reader :root

  def read(path)
    body = File.binread(path)
    [
      {"content-type" => Rack::Mime.mime_type(File.extname(path)),
       "content-length" => body.bytesize},
      body.each_line
    ]
  end

  def local_path(req_path)
    lpath = File.join root, File.expand_path(req_path)
    File.directory?(lpath) ? File.join(lpath, "index.html") : lpath
  end
end

# frozen_string_literal: true

##
# A mixin module that serves a compressed version of
# a file when the file is found to exist on disk,
# and has a ".gz" file extension.
module Server::Gzip
  def finish(request)
    path = gzip_path(request)
    if path
      body = File.binread(path)
      extn = File.extname(path[0..-4])
      [
        200,
        {"content-type" => mime_types[extn] || Rack::Mime.mime_type(extn),
         "content-encoding" => "gzip",
         "content-length" => body.bytesize},
        body.each_line
      ]
    else
      super
    end
  end

  private

  def gzip_path(request)
    return unless request.get_header("accept-encoding")
                        &.include?("gzip")
    path = "#{find_path(request)}.gz"
    File.exist?(path) ? path : nil
  end
end

# frozen_string_literal: true

class Server::ETag < Rack::ETag
  ETAGS = {}

  def initialize(app)
    @app = app
  end

  def call(env)
    headers = ETAGS[env["REQUEST_PATH"]] || {}
    if headers["etag"] && headers["etag"] == env["HTTP_IF_NONE_MATCH"]
      [304, headers, [""]]
    else
      status, headers, body = super(env)
      ETAGS[env["REQUEST_PATH"]] = headers
      [status, headers, body]
    end
  end
end

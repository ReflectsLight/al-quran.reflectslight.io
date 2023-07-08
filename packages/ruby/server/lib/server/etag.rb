# frozen_string_literal: true

class Server::ETag < Rack::ETag
  ETAGS = {}

  def initialize(app)
    @app = app
  end

  def call(env)
    h = ETAGS[env["REQUEST_PATH"]] || {}
    if h["etag"] && h["etag"] == env["HTTP_IF_NONE_MATCH"]
      [304, h, [""]]
    else
      status, headers, body = super(env)
      ETAGS[env["REQUEST_PATH"]] = headers
      [status, headers, body]
    end
  end
end

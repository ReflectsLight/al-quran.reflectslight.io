# frozen_string_literal: true

class Server::ETag < Rack::ETag
  ETAGS = {}

  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = super(env)
    if headers["etag"] && headers["etag"] == env["HTTP_IF_NONE_MATCH"]
      [304, headers, [""]]
    else
      [status, headers, body]
    end
  end
end

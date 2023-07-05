# frozen_string_literal: true

class Server::ETag < Rack::ETag
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = super(env)
    if env["HTTP_IF_NONE_MATCH"] == headers["etag"]
      [304, headers, [""]]
    else
      [status, headers, body]
    end
  end
end

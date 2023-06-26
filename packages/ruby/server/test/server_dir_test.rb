require_relative "setup"
require "rack/test"

class ServerDirTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def test_index
    get "/"
    assert_equal 200, last_response.status
    assert_equal "text/html", last_response.content_type
    assert_equal bytesize("./test/fakeweb/index.html"), last_response.content_length
  end

  def test_permission_denied
    File.chmod 0, "./test/fakeweb/permission_denied.html"
    get "/permission_denied.html"
    assert_equal 403, last_response.status
    assert_equal "text/plain", last_response.content_type
    assert_equal "Permission denied".bytesize, last_response.content_length
    assert_equal "Permission denied", last_response.body
  ensure
    File.chmod 0440, "./test/fakeweb/permission_denied.html"
  end

  private

  def app
    @app ||= Server.app("./test/fakeweb/")
  end

  def bytesize(path)
    File.binread(path).bytesize
  end
end

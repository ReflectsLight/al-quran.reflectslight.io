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

  private

  def app
    @app ||= Server.app("./test/fakeweb/")
  end

  def bytesize(path)
    File.binread(path).bytesize
  end
end

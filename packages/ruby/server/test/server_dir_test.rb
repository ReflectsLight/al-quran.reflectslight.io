# frozen_string_literal: true

require_relative "setup"
require "rack/test"

class ServerDirTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def test_index
    get "/"
    assert_equal 200, last_response.status
    assert_equal "text/html", last_response.content_type
    assert_equal bytesize("./test/webroot/index.html"), last_response.content_length
  end

  def test_ttf_font
    get "/fonts/roboto-mono-regular.ttf"
    assert_equal 200, last_response.status
    assert_equal "font/ttf", last_response.content_type
    assert_equal bytesize("./test/webroot/fonts/roboto-mono-regular.ttf"),
                 last_response.content_length
  end

  def test_js_file
    get "/js/index.js"
    assert_equal 200, last_response.status
    assert_equal "application/javascript", last_response.content_type
    assert_equal bytesize("./test/webroot/js/index.js"),
                 last_response.content_length
  end

  def test_png_file
    get "/images/0x1eef.png"
    assert_equal 200, last_response.status
    assert_equal "image/png", last_response.content_type
    assert_equal bytesize("./test/webroot/images/0x1eef.png"),
                 last_response.content_length
  end

  def test_json_file
    get "/json/1.json"
    assert_equal 200, last_response.status
    assert_equal "application/json", last_response.content_type
    assert_equal bytesize("./test/webroot/json/1.json"),
                 last_response.content_length
  end

  def test_internal_server_error
    def app.finish(request) raise "test" end
    get "/"
    assert_equal 500, last_response.status
    assert_equal "text/plain", last_response.content_type
    assert_equal "Internal server error (RuntimeError)".bytesize,
                 last_response.content_length
    assert_equal "Internal server error (RuntimeError)",
                 last_response.body
  end

  def test_permission_denied
    File.chmod 0, "./test/webroot/permission_denied.html"
    get "/permission_denied.html"
    assert_equal 403, last_response.status
    assert_equal "text/plain", last_response.content_type
    assert_equal "Permission denied".bytesize, last_response.content_length
    assert_equal "Permission denied", last_response.body
  ensure
    File.chmod 0o440, "./test/webroot/permission_denied.html"
  end

  def test_page_not_found
    get "/foobarbaz"
    assert_equal 404, last_response.status
    assert_equal "text/plain", last_response.content_type
    assert_equal "The requested URL was not found".bytesize, last_response.content_length
    assert_equal "The requested URL was not found", last_response.body
  end

  private

  def app
    @app ||= Server.app("./test/webroot/")
  end

  def bytesize(path)
    File.binread(path).bytesize
  end
end

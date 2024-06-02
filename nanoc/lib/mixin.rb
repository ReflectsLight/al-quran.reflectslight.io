# frozen_string_literal: true

module Mixin
  require "test-cmd"
  require_relative "mixin/t"
  require_relative "mixin/inline"
  require_relative "mixin/erb"
  require_relative "mixin/opengraph"

  def app_version
    @app_version ||= begin
      ver = File.read File.join(Dir.getwd, "VERSION")
      ver.gsub(/[^\d.]/, "")
    end
  end

  def revision
    cmd("git rev-parse HEAD").stdout.strip
  end

  def build_dir
    nanoc.output_dir
  end

  ##
  # The URL for an audio file is resolved
  # by joining `nanoc.audio.base_url` and
  # `/<surahid>/<ayahid>.mp3`.
  #
  # @return [String]
  #  Returns the base url for audio requests.
  #  The default (https://al-quran.reflectslight.io/audio/alafasy)
  #  works out of the box.
  def audio_base_url
    nanoc.audio.base_url
  end

  ##
  # @return [String]
  #  Returns the base URL for use with opengraph,
  #  <link> tags, /sitemap.xml, etc. The default is
  #  https://al-quran.reflectslight.io.
  def base_url
    nanoc.server.base_url
  end

  ##
  # @return [Ryo::Object]
  #  Returns the contents of nanoc.yaml as a Ryo object
  def nanoc
    return @nanoc if defined?(@nanoc)
    @nanoc = begin
      path = File.join(Dir.getwd, "nanoc.yaml")
      Ryo.from YAML.load_file(path)
    end
  end

  include T
  include Inline
  include ERB
  include OpenGraph
end
use_helper Mixin

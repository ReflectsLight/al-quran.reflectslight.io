# frozen_string_literal: true

module Mixin
  require "test-cmd"
  require_relative "mixin/t"
  require_relative "mixin/inline"
  require_relative "mixin/erb"
  require_relative "mixin/opengraph"

  ##
  # @return [Ryo::Object]
  #  Returns common directory paths as a Ryo object
  def dirs
    @dirs ||= Ryo(
      root:,
      build: nanoc.output_dir,
      content: File.join(root, nanoc.data_sources[0].content_dir)
    )
  end

  ##
  # @return [Ryo::Object]
  #  Returns the contents of nanoc.yaml as a Ryo object
  def nanoc
    @nanoc ||= Ryo.from_yaml(path: File.join(root, "nanoc.yaml"))
  end

  ##
  # @return [String]
  #  Returns an absolute path to the root directory of the website
  def root
    @root ||= File.realpath(File.join(__dir__, "..", "..", "."))
  end

  ##
  # @return [String]
  #  Returns the website version
  def version
    @version ||= File.read(File.join(dirs.root, "VERSION"))
                     .gsub(/[^\d.]/, "")
  end

  ##
  # @return [String]
  #  Returns the most recent git commit hash
  def commit
    @commit ||= cmd("git", "rev-parse", "HEAD").stdout.strip
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

  include T
  include Inline
  include ERB
  include OpenGraph
end
use_helper Mixin

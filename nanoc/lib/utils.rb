# frozen_string_literal: true

##
# The {Utils Utils} module provides methods that are
# available at build time. ERB templates, the Rules file
# and Rakefile.rb all have access to the methods of this
# module
module Utils
  require "test-cmd"
  require_relative "utils/t"
  require_relative "utils/inline"
  require_relative "utils/erb"

  ##
  # Generic error
  Error = Class.new(RuntimeError) unless defined?(Error)

  ##
  # @return [Ryo::Object]
  #  Returns common directory paths as a Ryo object
  def dirs
    @dirs ||= Ryo(
      root:,
      build: File.join(root, nanoc.output_dir),
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
    @version ||= begin
      path = File.join(dirs.root, "share", "al-quran.reflectslight.io", "VERSION")
      File.read(path).gsub(/[^\d.]/, "")
    end
  end

  ##
  # @raise [Utils::Error]
  #  When git fails or is unavailable
  # @return [String]
  #  Returns the most recent git commit hash
  def commit
    @commit ||= begin
      hash = nil
      cmd("git", "rev-parse", "HEAD")
        .success { hash = _1.stdout.strip }
        .failure { error!("git exited unsuccessfully in method Utils#commit") }
      hash
    end
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

  private

  def error!(m)
    raise Error, m, []
  end
end
use_helper(Utils) if respond_to?(:use_helper)

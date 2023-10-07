# frozen_string_literal: true

module Mixin
  require "memoize"
  extend Memoize

  require_relative "mixin/t"
  require_relative "mixin/inline"
  require_relative "mixin/erb"
  require_relative "mixin/opengraph"

  def build_dir
    nanoc = Ryo.from YAML.load_file(File.join(Dir.getwd, "nanoc.yaml"))
    nanoc.output_dir
  end
  memoize :build_dir

  include T
  include Inline
  include ERB
  include OpenGraph
end
use_helper Mixin

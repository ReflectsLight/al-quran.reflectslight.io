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
    ["v#{app_version}", " ", "(#{cmd("git rev-parse HEAD").stdout.strip})"].join
  end

  def build_dir
    @build_dir ||= begin
      nanoc = Ryo.from YAML.load_file(File.join(Dir.getwd, "nanoc.yaml"))
      nanoc.output_dir
    end
  end

  include T
  include Inline
  include ERB
  include OpenGraph
end
use_helper Mixin

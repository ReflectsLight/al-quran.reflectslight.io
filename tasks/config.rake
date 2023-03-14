##
# frozen_string_literal: true

require "bundler/setup"
require "erb"
require "ryo"
require "yaml"
require_relative "../tasks.lib/erb_context"

read_options = ->(env:) do
  path = File.join(Dir.getwd, "config", "#{env}.yml")
  Ryo.from(YAML.load_file(path))
end

task "config:build", :env do |task, args|
  options = read_options.call(**args)
  context = ERBContext.with_locals(options)
  glob = File.join(Dir.getwd, "config", args[:env], "etc", "*.conf.erb")
  etc_files = Dir.glob(glob)
  etc_files.each do |file|
    File.binwrite File.join(File.dirname(file), File.basename(file, ".erb")),
                  ERB.new(File.binread(file), trim_mode: "-").result(context)
  end
end

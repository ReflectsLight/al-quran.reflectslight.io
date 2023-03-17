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
  Rake::Task["config:build:etc"].invoke(args[:env])
  Rake::Task["config:build:nginx"].invoke(args[:env])
end

task "config:build:etc", :env do |task, args|
  options = read_options.call(**args)
  context = ERBContext.with_locals(options)
  glob = File.join("config", args[:env], "etc", "*.conf.erb")
  etc_files = Dir.glob(glob)
  etc_files.each do |file|
    dest = File.join(File.dirname(file), File.basename(file, ".erb"))
    File.binwrite dest,
                  ERB.new(File.binread(file), trim_mode: "-").result(context)
    print "View #{dest} [y/n]:"
    system("cat #{dest} | less") if $stdin.gets.chomp == "y"
  end
end

task "config:build:nginx", :env do |task, args|
  options = read_options.call(**args)
  context = ERBContext.with_locals(options)
  glob = File.join("config", args[:env], "usr.local.etc", "**", "*.conf.erb")
  Dir.glob(glob).each do |file|
    dest = File.join(File.dirname(file), File.basename(file, ".erb"))
    File.binwrite dest,
                  ERB.new(File.binread(file), trim_mode: "-").result(context)
    print "View #{dest} [y/n]:"
    system("cat #{dest} | less") if $stdin.gets.chomp == "y"
  end
end

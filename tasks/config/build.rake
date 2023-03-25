##
# frozen_string_literal: true

require "bundler/setup"
require "erb"
require "ryo"
require "yaml"
require_relative "../../tasks.lib/erb_context"

read_options = ->(env:) do
  path = File.join(Dir.getwd, "config", "#{env}.yml")
  Ryo.from(YAML.load_file(path))
end

get_build_dir = -> (env:) do
  path = File.join("./build", env)
  mkdir_p(path) unless Dir.exist?(path)
  path
end

build_files = -> (env:, base:, glob:) do
  options = read_options.call(env:)
  build_dir = get_build_dir.call(env:)
  context = ERBContext.with_locals(options)
  Dir.glob(glob, base:).each do |file|
    erbf = File.join(base, file)
    path = File.join(build_dir, File.dirname(file))
    dest = File.join(path, File.basename(file, ".erb"))
    mkdir_p(path)
    File.binwrite dest,
                  ERB.new(File.binread(erbf), trim_mode: "-").result(context)
    print "View #{dest} [y/n]:"
    system("cat #{dest} | less") if $stdin.gets.chomp == "y"
  end
end

desc "Build configuration files"
task "config:build", :env do |task, args|
  env = args[:env]
  case env
  when "remote"
    Rake::Task["config:build:etc"].invoke(env)
  when "local"
    # no-op
  else
    warn "env should be 'remote', or 'local', got: #{env}"
  end
  Rake::Task["config:build:nginx"].invoke(env)
end

desc "Build /etc configuration files"
task "config:build:etc", :env do |task, args|
  env = args[:env]
  build_files.call(
    env:,
    base: "config/#{env}",
    glob: "etc/*.conf.erb"
  )
end

desc "Build nginx configuration files"
task "config:build:nginx", :env do |task, args|
  env = args[:env]
  build_files.call(
    env:,
    base: "config/generic",
    glob: "usr.local.etc/**/*.conf.erb"
  )
end

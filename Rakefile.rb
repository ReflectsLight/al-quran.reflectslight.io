# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "yaml"

##
# Rake tasks
load "rake/tasks/deploy.rake"
load "rake/tasks/linter.rake"
load "rake/tasks/nanoc.rake"
load "rake/tasks/submodules.rake"

desc "Serve the website on localhost"
task :server, [:host, :port] do |_t, args|
  require "server"
  build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir
  h = args.to_h
  s = Server.for_dir(build_dir, h.slice(:host,:port))
  s.start(block: true)
rescue Interrupt
  s.stop
end
task default: "nanoc:build"

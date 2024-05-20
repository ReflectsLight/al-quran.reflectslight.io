# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "yaml"

##
# Rake tasks
begin
  load "rake/tasks/deploy.rake"
rescue LoadError
  warn "[warn] #{$!.class}: #{$!.message}"
end
load "rake/tasks/format.rake"
load "rake/tasks/nanoc.rake"
load "rake/tasks/t.rake"
load "rake/tasks/ci.rake"

desc "Serve the website on localhost"
task :server, [:protocol] do |_t, args|
  require "server"
  nanoc = Ryo.from(YAML.load_file("./nanoc.yaml"))
  h = args.to_h
  o = if h[:protocol] == "unix"
    {unix: nanoc.server.unix.path}
  else
    {host: nanoc.server.tcp.host, port: nanoc.server.tcp.port}
  end
  s = Server.dir(nanoc.output_dir, o)
  s.start(block: true)
rescue Interrupt
  s.stop
end
task default: "nanoc:build"

# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "yaml"

begin
  load "rake/tasks/deploy.rake"
rescue LoadError
  warn "[warn] #{$!.class}: #{$!.message}"
end
load "rake/tasks/format.rake"
load "rake/tasks/nanoc.rake"
load "rake/tasks/t.rake"
load "rake/tasks/ci.rake"
load "rake/tasks/server.rake"
task default: "nanoc:build"

# frozen_string_literal: true

require "bundler/setup"
require "nanoc"
require "ryo"

require_relative "nanoc/lib/utils"
include Utils

begin
  load "rake/tasks/deploy.rake"
rescue LoadError => ex
  warn "[warn] #{ex.class}: #{ex.message}"
end
tasks = Dir["rake/tasks/*.rake"]
tasks.each { load(_1) }
task default: "nanoc:build"

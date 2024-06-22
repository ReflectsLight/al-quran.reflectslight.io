# frozen_string_literal: true

require "bundler/setup"
require "nanoc"
require "ryo"
require "ryo/yaml"
require "ryo/json"

require_relative "nanoc/lib/utils"
include Utils

begin
  load "rake/tasks/deploy.rake"
rescue LoadError => ex
  warn "[warn] #{ex.class}: #{ex.message}"
end
load "rake/tasks/format.rake"
load "rake/tasks/nanoc.rake"
load "rake/tasks/t.rake"
load "rake/tasks/ci.rake"
load "rake/tasks/server.rake"
task default: "nanoc:build"

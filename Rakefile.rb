# frozen_string_literal: true

require "bundler/setup"
require_relative "lib/tasks"
include Tasks

namespace :nanoc do
  task :compile do
    sh "nanoc co"
  end
end
task build: "nanoc:compile"

task server: ["nanoc:compile"] do
  Dir.chdir(File.join(Dir.getwd, "build", "al-quran")) do
    sh "ruby -S bundle exec adsf"
  end
end

namespace :deploy do
  task local: ["nanoc:compile"] do
    Deploy::Local.call
  end

  task remote: ["nanoc:compile"] do
    require "dotenv"
    Dotenv.load
    Deploy::Remote.call
  end
end

namespace :linter do
  task :ruby do
    sh "bundle exec rubocop lib/ src/"
  end

  task :typescript do
    sh "npm run eslint"
  end
end
task lint: ["linter:ruby", "linter:typescript"]
task default: "deploy:local"

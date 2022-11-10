# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require_relative "lib/tasks"
include Tasks

namespace :nanoc do
  task :compile do
    sh "nanoc co"
  end

  task :clean do
    build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir
    sh "rm -rf #{build_dir}"
  end
end
task build: "nanoc:compile"

task server: ["nanoc:compile"] do
  Dir.chdir(File.join(Dir.getwd, "build", "al-quran")) do
    sh "ruby -S bundle exec adsf"
  end
end

namespace :deploy do
  task local: ["env:development", "nanoc:compile"] do
    Deploy::Local.call
  end

  task remote: ["env:production", "nanoc:clean", "nanoc:compile"] do
    Deploy::Remote.call
  end
end

namespace :env do
  task :production do
    require "dotenv"
    Dotenv.load
  end

  task :development do
    ENV["NODE_ENV"] ||= "development"
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

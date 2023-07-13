# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "yaml"
load "tasks/deploy.rake"

build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir

namespace :nanoc do
  task :compile do
    ENV["SASS_PATH"] = "./src/css/"
    sh "bundle exec nanoc co"
  end

  task :clean do
    sh "rm -rf #{build_dir}"
  end

  task watch: [:compile] do
    require "listen"
    Listen.to File.join(Dir.getwd, "src"), force_polling: true do
      sh "rake build"
    end.start
    sleep
  end
end

desc "Build the website"
task build: "nanoc:compile"

desc "Trigger a build when src/ is modified"
task "build:watch" => "nanoc:watch"

desc "Clean the build directory"
task clean: "nanoc:clean"

desc "Serve the website on localhost"
task :server do
  require "server"
  s = Server.for_dir(build_dir)
  s.start(block: true)
rescue Interrupt
  s.stop
end

namespace :lint do
  desc "Run rubocop (Ruby)"
  task :rubocop do
    sh "bundle exec rubocop"
  end

  desc "Run eslint (TypeScript)"
  task :eslint do
    sh "npm run eslint"
  end

  namespace :eslint do
    desc "Run eslint with the --fix option (TypeScript)"
    task :fix do
      sh "npm run eslint-autofix"
    end
  end
end
task lint: ["lint:rubocop", "lint:eslint"]
task default: "build"

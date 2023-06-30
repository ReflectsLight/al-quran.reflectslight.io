# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "yaml"

build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir

namespace :nanoc do
  desc "Compile the website"
  task :compile do
    ENV["SASS_PATH"] = "./src/css/"
    sh "bundle exec nanoc co"
  end

  desc "Delete the build directory"
  task :clean do
    sh "rm -rf #{build_dir}"
  end
end

desc "Build the website"
task build: "nanoc:compile"

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

namespace :watch do
  desc "Watch for changes (server task)"
  task :server do
    Bundler.with_unbundled_env { Process.wait spawn("rake build") }
    Listen.to(File.join(Dir.getwd, "src")) do
      Bundler.with_unbundled_env { sh "rake build" }
    end.start
    Rake::Task["server"].invoke
  end
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
task default: "deploy:local"

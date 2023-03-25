# frozen_string_literal: true

require "ryo"
require "listen"
require_relative "lib/tasks"
ENV["SASS_PATH"] = "./src/css/"

load "tasks/config/build.rake"
load "tasks/config/install.rake"
load "tasks/deploy.rake"

namespace :nanoc do
  desc "Compile the website"
  task :compile do
    sh "bundle exec nanoc co"
  end

  desc "Delete the build directory"
  task :clean do
    build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir
    sh "rm -rf #{build_dir}"
  end
end
task build: "nanoc:compile"

desc "Start a Ruby web server on localhost"
task server: ["nanoc:compile"] do
  Dir.chdir(File.join(Dir.getwd, "build", "al-quran")) do
    sh "bundle exec adsf"
  end
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
task lint: ["linter:ruby", "linter:typescript"]
task default: "deploy:local"

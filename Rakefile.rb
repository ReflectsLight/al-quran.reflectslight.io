# frozen_string_literal: true

require "bundler/setup"
require "ryo"
require "listen"
require_relative "lib/tasks"
include Tasks

namespace :nanoc do
  desc "Compile the website"
  task :compile do
    sh "nanoc co"
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
    sh "ruby -S bundle exec adsf"
  end
end

namespace :watch do
  desc "Watch for changes (server task)"
  task :server do
    Listen.to(File.join(Dir.getwd, "src")) do
      Bundler.with_unbundled_env { sh "rake build" }
    end.start
    Rake::Task["server"].invoke
  end

  namespace :deploy do
    desc "Watch for changes (deploy:local task)"
    task :local do
      Listen.to(File.join(Dir.getwd, "src")) do
        Bundler.with_unbundled_env { sh "rake deploy:local" }
      end.start
      sleep
    end
  end
end

namespace :deploy do
  desc "Deploy to a local web server (eg nginx)"
  task local: ["env:set-development-vars", "nanoc:compile"] do
    Deploy::Local.call
  end

  desc "Deploy to production"
  task remote: ["env:verify-production-branch",
                "env:set-production-vars",
                "nanoc:clean",
                "nanoc:compile"] do
    Deploy::Remote.call
  end
end

namespace :env do
  desc "Verify the production branch is being used"
  task :'verify-production-branch' do
    git_branch = `git branch --show-current`.chomp
    if git_branch != "production"
      warn "This task can only be run on the 'production' branch."
      exit(1)
    end
  end

  desc "Set environment variables for the production environment"
  task :'set-production-vars' do
    require "dotenv"
    Dotenv.load
  end

  desc "Set environment variables for the development environment"
  task :'set-development-vars' do
    ENV["NODE_ENV"] ||= "development"
  end
end

namespace :linter do
  desc "Run the Ruby linter"
  task :ruby do
    sh "bundle exec rubocop lib/ src/"
  end

  desc "Run the TypeScript linter"
  task :typescript do
    sh "npm run eslint"
  end
end
task lint: ["linter:ruby", "linter:typescript"]
task default: "deploy:local"

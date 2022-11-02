require "bundler/setup"
require_relative "lib/tasks"
include Tasks

namespace :nanoc do
  task :compile do
    sh "nanoc co"
  end
end

namespace :deploy do
  task local: ["nanoc:compile"] do
    Deploy::Local.call
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

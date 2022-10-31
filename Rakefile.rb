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

task default: "deploy:local"

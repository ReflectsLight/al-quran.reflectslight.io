# frozen_string_literal: true

namespace :ci do
  task :rubocop do
    sh "bundle exec rubocop -c etc/rubocop.yml"
  end

  task :eslint do
    sh "npm run eslint"
  end

  task :tsc do
    sh "npm run tsc"
  end

  task :env do
    ENV["buildenv"] = "production"
  end
end

desc "Run CI tasks"
task ci: %i[ci:env ci:rubocop ci:eslint ci:tsc nanoc:clean nanoc:build]

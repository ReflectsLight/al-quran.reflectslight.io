# frozen_string_literal: true

namespace :ci do
  task :rubocop do
    sh "bundle exec rubocop"
  end

  task :eslint do
    sh "npx eslint src/js"
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

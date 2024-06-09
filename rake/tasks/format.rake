# frozen_string_literal: true

namespace :format do
  desc "Run rubocop (Ruby)"
  task :rubocop do
    sh "bundle exec rubocop -A"
  end

  desc "Run eslint (TypeScript)"
  task :eslint do
    sh "npm run eslint"
  end
end

desc "Run all formats"
task format: ["format:rubocop", "format:eslint"]

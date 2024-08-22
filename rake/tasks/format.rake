# frozen_string_literal: true

namespace :format do
  desc "Run rubocop (Ruby)"
  task :rubocop do
    sh "bundle exec rubocop --config etc/rubocop.yml"
  end

  desc "Apply rubocop (Ruby)"
  task :"rubocop:apply" do
    sh "bundle exec rubocop -A --config etc/rubocop.yml"
  end

  desc "Run eslint (TypeScript)"
  task :eslint do
    sh "npm run eslint"
  end

  desc "Run eslint (TypeScript)"
  task :"eslint:apply" do
    sh "npm run eslint:apply"
  end
end

desc "Run all formats"
task format: ["format:rubocop", "format:eslint"]

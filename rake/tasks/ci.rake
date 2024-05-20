# frozen_string_literal: true

desc "Run CI tasks"
task :ci do
  sh "bundle exec rubocop"
  sh "npm exec eslint -- src/js/"
  sh "npm exec prettier -- --check src/js/"
  Bundler.with_original_env { sh "buildenv=production rake nanoc:clean nanoc:build" }
end

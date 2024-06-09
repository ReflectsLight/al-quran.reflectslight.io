# frozen_string_literal: true

desc "Run CI tasks"
task :ci do
  ##
  # format
  sh "bundle exec rubocop"
  sh "npm exec eslint -- src/js/"

  ##
  # tsc
  sh "npm run tsc"

  ##
  # build
  Bundler.with_original_env { sh "buildenv=production rake nanoc:clean nanoc:build" }
end

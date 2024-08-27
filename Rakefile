#!/usr/bin/env ruby
# frozen_string_literal: true

namespace :source do
  desc "Clone the website"
  task :clone do
    # TODO
  end

  desc "Pull website updates"
  task :pull do
    Dir.chdir File.join(__dir__, "source") do
      sh "git pull --rebase origin main"
    end
  end
end

namespace :website do
  desc "Build the website"
  task build: %i[website:clean] do
    Dir.chdir File.join(__dir__, "source") do
      Bundler.with_unbundled_env do
        sh "bundle exec rake nanoc:clean"
        sh "bundle exec rake nanoc:build[production]"
        sh "mv build/ ../"
      end
    end
  end

  desc "Deploy the website"
  task deploy: %i[source:pull website:build] do
    sh "git commit -am 'Update build/al-quran' || true"
    sh "git push github production"
  end

  desc "Clean the build/ directory"
  task :clean do
    sh "rm -rf build/"
  end
end

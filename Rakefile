#!/usr/bin/env ruby
# frozen_string_literal: true

namespace :source do
  desc "Clone the website"
  task :clone do
    sh "git clone https://github.com/ReflectsLight/al-quran.reflectslight.io source/"
  end

  desc "Pull website updates"
  task :pull do
    Dir.chdir File.join(__dir__, "source") do
      sh "git pull origin main"
    end
  end
end

namespace :website do
  desc "Build the website"
  task build: %i[website:clean] do
    Dir.chdir File.join(__dir__, "source") do
      Bundler.with_unbundled_env do
        sh "./bin/setup"
        sh "bundle exec rake nanoc:clean"
        sh "bundle exec rake nanoc:build[production]"
        sh "mv build/ ../"
      end
    end
  end

  desc "Deploy the website"
  task deploy: %i[source:pull website:build] do
    sh "git add -f build/"
    sh "git commit -am 'Deploy' || true"
    sh "git push github production"
  end

  desc "Clean the build/ directory"
  task :clean do
    sh "rm -rf build/"
  end
end

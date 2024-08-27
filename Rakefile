namespace :source do
  desc "Clone"
  task :clone do
    # TODO
  end

  desc "Pull updates"
  task :pull do
    Dir.chdir File.join(__dir__, "source") do
      sh "git pull --rebase origin main"
    end
  end

  desc "Build the website"
  task build: %i[source:clean] do
    Dir.chdir File.join(__dir__, "source") do
      Bundler.with_unbundled_env do
        sh "bundle exec rake nanoc:clean"
        sh "bundle exec rake nanoc:build[production]"
        sh "mv build/ ../"
      end
    end
  end

  desc "Deploy the website"
  task deploy: %i[source:build] do
    sh "git commit -am 'Update build/al-quran' || true"
    sh "git push github production"
  end

  desc "Clean the build/ directory"
  task :clean do
    sh "rm -rf build/"
  end
end

namespace :source do
  task :clone do
    sh "git clone " \
       "http://git.bastion.home.network/ReflectsLight/al-quran.reflectslight.io " \
       "source/"
  end

  task :pull do
    Dir.chdir File.join(__dir__, "source") do
      sh "git pull --rebase origin main"
    end
  end

  task :build do
    sh "rm -rf build/"
    Dir.chdir File.join(__dir__, "source") do
      Bundler.with_unbundled_env do
      sh "bundle exec rake nanoc:clean"
      sh "bundle exec rake nanoc:build[production]"
      sh "mv build/ ../"
      end
    end
  end
end

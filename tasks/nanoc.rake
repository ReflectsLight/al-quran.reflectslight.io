namespace :nanoc do
  require "bundler/setup"
  cwd = File.realpath File.join(__dir__, "..")

  desc "Clean the build/ directory"
  task :clean do
    Dir.chdir(cwd) do
      sh "rm -rf node_modules/.cache/"
      sh "rm -rf tmp/"
      sh "rm -rf build"
    end
  end

  desc "Produce the build/ directory"
  task :build, [:buildenv] do |t, args|

    Dir.chdir(cwd) do
      buildenv = args.buildenv || ENV["buildenv"] || "development"
      sass_path = File.join(cwd, "src", "css")
      sh "rm -rf build/al-quran/css/"
      Bundler.with_unbundled_env {
        sh "SASS_PATH=#{sass_path} buildenv=#{buildenv} bundle exec nanoc co"
      }
    end
  end

  desc "Produce the build/ directory on-demand"
  task watch: ['nanoc:build'] do
    Dir.chdir(cwd) do
      require "listen"
      path = File.join(Dir.getwd, "src")
      Listen.to(path) do
        Bundler.with_unbundled_env { sh "rake nanoc:build" }
      end.start
      sleep
    end
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  end
end

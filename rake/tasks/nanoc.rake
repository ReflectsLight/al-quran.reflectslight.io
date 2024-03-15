namespace :nanoc do
  require "bundler/setup"
  root = File.realpath File.join(__dir__, "..", "..")

  desc "Clean the build/ directory"
  task :clean do
    Dir.chdir(root) do
      sh "rm -rf node_modules/.cache/"
      sh "rm -rf tmp/"
      sh "rm -rf build"
    end
  end

  desc "Produce the build/ directory"
  task :build, [:buildenv] do |t, args|
    Dir.chdir(root) do
      buildenv = args.buildenv || ENV["buildenv"] || "development"
      sass_path = File.join(root, "src", "css")
      sh "rm -rf build/al-quran/css/"
      Bundler.with_unbundled_env {
        sh "SASS_PATH=#{sass_path} buildenv=#{buildenv} bundle exec nanoc co"
      }
    end
  end

  desc "Produce the build/ directory on-demand"
  task watch: ['nanoc:build'] do
    Dir.chdir(root) do
      require "listen"
      srcdir = File.join(root, "src")
      Listen.to(srcdir) do
        Bundler.with_unbundled_env { sh "rake nanoc:build" }
      end.start
      sleep
    end
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  end
end

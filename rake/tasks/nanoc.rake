require "bundler/setup"
require "nanoc"
cwd = File.realpath File.join(__dir__, "..", "..")

namespace :nanoc do
  desc "Clean the build/ directory"
  task :clean do
    Dir.chdir(cwd) do
      sh "rm -rf node_modules/.cache/"
      sh "rm -rf build/"
      sh "rm -rf tmp/"
    end
  end

  desc "Produce the build/ directory"
  task :build, %i[buildenv] => %i[setenv] do |t, args|
    Nanoc::CLI.run(["compile"])
  end

  desc "Produce the build/ directory on-demand"
  task :watch, %i[buildenv] => %i[setenv nanoc:build]  do |t, args|
    require "listen"
    path = File.join(Dir.getwd, "src")
    Listen.to(path) do
      Nanoc::CLI.run(["compile"])
    end.start
    sleep
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  end

  task :setenv, %i[buildenv] do |t, args|
    ENV["SASS_PATH"] = File.join(cwd, "src", "css")
    ENV["buildenv"] = args.buildenv || ENV["buildenv"] || "development"
  end
end

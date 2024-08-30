# frozen_string_literal: true

namespace :nanoc do
  desc "Clean directories"
  task :clean do
    Dir.chdir(dirs.root) do
      sh "rm -rf node_modules/.cache/"
      sh "rm -rf #{nanoc.output_dir}/*"
      sh "rm -rf tmp/"
    end
  end

  desc "Produce the build directory"
  task :build, %i[buildenv] => %i[setenv] do |t, args|
    Nanoc::CLI.run(["compile"])
  end

  desc "Produce the build directory on-demand"
  task :watch, %i[buildenv] => %i[setenv nanoc:build]  do |t, args|
    require "listen"
    Listen.to(dirs.content) {
      Nanoc::CLI.run(["compile"])
    }.start
    sleep
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  end

  task :setenv, %i[buildenv] do |t, args|
    ENV["SASS_PATH"] = File.join(dirs.content, "css")
    ENV["buildenv"] = args.buildenv || ENV["buildenv"] || "development"
  end
end

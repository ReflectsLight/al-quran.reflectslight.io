# frozen_string_literal: true

require "fileutils"
require "lockf"
build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir
lockp = File.join Dir.getwd, "tmp", "build.lock"
FileUtils.mkdir_p File.dirname(lockp)
FileUtils.touch(lockp)
lockf = LockFile.new(lockp)

namespace :nanoc do
  task compile: %w[clean:css] do
    warn "[build] Acquire lock..."
    lockf.lock
    ENV["SASS_PATH"] = "./src/css/"
    sh "bundle exec nanoc co"
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  ensure
    warn "[build] Release lock..."
    lockf.release
  end

  task :clean do
    warn "[build] Acquire lock..."
    lockf.lock
    sh "rm -rf #{build_dir}"
  ensure
    warn "[build] Release lock..."
    lockf.release
  end

  task "clean:css" do
    warn "[build] Acquire lock..."
    lockf.lock
    cssdir = File.join(build_dir, "css")
    sh "rm -rf #{cssdir}" if Dir.exist?(cssdir)
  ensure
    warn "[build] Release lock..."
    lockf.release
  end

  task watch: %w[build] do
    require "listen"
    Listen.to File.join(Dir.getwd, "src"), force_polling: true do
      sh "rake build"
    end.start
    sleep
  rescue Interrupt
    warn "SIGINT: exit"
    exit
  end
end

desc "Build the website"
task build: %w[nanoc:compile]

desc "Trigger a build when src/ is modified"
task "build:watch" => "nanoc:watch"

desc "Clean the build directory"
task clean: "nanoc:clean"

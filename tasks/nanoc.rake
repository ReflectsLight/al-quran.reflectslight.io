# frozen_string_literal: true

build_dir = Ryo.from(YAML.load_file("./nanoc.yaml")).output_dir
namespace :nanoc do
  task :compile do
    ENV["SASS_PATH"] = "./src/css/"
    sh "bundle exec nanoc co"
  end

  task :clean do
    sh "rm -rf #{build_dir}"
  end

  task :clean_css do
    cssdir = File.join(build_dir, "css")
    if Dir.exist?(cssdir)
      sh "rm -rf #{cssdir}"
    end
  end

  task watch: [:compile] do
    require "listen"
    Listen.to File.join(Dir.getwd, "src"), force_polling: true do
      sh "rake build"
    end.start
    sleep
  end
end

desc "Build the website"
task build: ["nanoc:clean_css", "nanoc:compile"]

desc "Trigger a build when src/ is modified"
task "build:watch" => "nanoc:watch"

desc "Clean the build directory"
task clean: "nanoc:clean"

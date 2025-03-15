namespace :tail do
  desc "Build tail.css"
  task :build do
    root = File.join(__dir__, "..", "..")
    tail = File.join(root, "packages", "css", "tail.css")
    Dir.chdir(tail) { sh "bin/build" }
  end

  desc "Install tail.css"
  task :install do
    root = File.join(__dir__, "..", "..")
    tail = File.join(root, "packages", "css", "tail.css", "dist", "tail.css")
    cp(tail, File.join(root, "src", "css", "vendor", "tail.scss"))
  end
end

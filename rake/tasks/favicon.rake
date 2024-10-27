# frozen_string_literal: true

namespace :favicon do
  task :png do
    %w[256 128 64 48 32 16].each do |size|
      infile  = File.join(dirs.root, "src", "images", "favicon.svg")
      outfile = File.join(dirs.root, "src", "images", "favicon-#{size}x#{size}.png")
      argv = ["-h", size, "-w", size, "-a", "-f", "png", infile, "-o", outfile]
      sh "rsvg-convert", *argv
    end
  end

  task :ico do
    png = Dir.glob File.join(dirs.root, "src", "images", "favicon-*.png")
    ico = File.join(dirs.root, "src", "favicon.ico")
    sh "convert", *png, ico
  end
end

desc "Generate favicons"
task favicon: %i[favicon:png favicon:ico]

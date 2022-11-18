# frozen_string_literal: true

##
# Compiles a JavaScript / TypeScript asset with webpack.
class Nanoc::Filter::Webpack < Nanoc::Filter
  EXTNAMES = [".jsx", ".js", ".tsx", ".ts"]
  include FileUtils

  identifier :webpack
  type :text
  always_outdated

  def run(content, options = {})
    file, dir = temp!(content, extname(item.identifier.to_s))
    basename = basename_for(item.identifier.to_s)
    webpack(file.path, basename)
    File.read(File.join(dir, basename))
        .tap {
          file.tap(&:unlink).close
          rm_rf(dir)
        }
  end

  private

  def basename_for(path)
    File.basename path.sub(/#{Regexp.escape(extname(path))}\z/) {
      EXTNAMES.include?(extname(path)) ? ".js" : nil
    }
  end

  def extname(path)
    File.extname(path)
  end

  def webpack(path, basename)
    system "node",
           "./node_modules/webpack/bin/webpack.js",
           "--entry", path,
           "--output-path", File.dirname(path),
           "--output-filename", basename
    exit! unless $?.success?
  end

  def temp!(content, extname)
    dir = File.join(Dir.getwd, "tmp", "webpack")
    rm_rf(dir)
    mkdir_p(dir)
    file = Tempfile.new(["webpack", extname], dir)
    file.write(content)
    [file.tap(&:flush), dir]
  end
end

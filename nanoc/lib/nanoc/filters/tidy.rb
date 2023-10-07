# frozen_string_literal: true

class Nanoc::Filters::Tidy < Nanoc::Filter
  require "fileutils"
  include FileUtils
  Error = Class.new(RuntimeError)

  identifier :tidy
  type text: :text

  def self.default_options
    @default_options ||= {wrap: 120, indent: true}
  end

  def run(content, options = {})
    file = temporary_file_for(content)
    tidy file, self.class.default_options.merge(options)
  end

  private

  def tidy(file, options)
    system "tidy", "-modify", "-quiet", *tidy_args(options), file.path
    if $?.success?
      File.read(file.path).tap { file.tap(&:unlink).close }
    else
      raise Error, "tidy exited unsuccessfully (exit code: #{$?.exitstatus})", []
    end
  end

  def tidy_args(options)
    options.each_with_object([]) do |(key, value), ary|
      if value.equal?(true)
        ary << "-#{key}"
      else
        ary.concat ["-#{key}", value.to_s]
      end
    end
  end

  def temporary_file_for(content)
    dir = File.join(Dir.getwd, "tmp", "htmltidy")
    mkdir_p(dir) unless Dir.exist?(dir)
    file = Tempfile.new(File.basename(item.identifier.to_s), dir)
    file.write(content)
    file.tap(&:flush)
  end
end

# frozen_string_literal: true

module GZip
  require "zlib"
  include Zlib

  private

  def gzip(content, level, strategy)
    level ||= Zlib::BEST_COMPRESSION
    strategy ||= Zlib::DEFAULT_STRATEGY
    GzipWriter.open(output_filename, level, strategy) do
      _1.write(content)
    end
  end
end

class Nanoc::Filter::GZipText < Nanoc::Filter
  include GZip
  identifier :gzip_text
  type text: :binary

  def run(content, options = {})
    gzip(
      content,
      options[:delete],
      options[:strategy]
    )
  end
end

class Nanoc::Filter::GZipBinary < Nanoc::Filter
  include GZip
  identifier :gzip_binary
  type binary: :binary

  def run(file, options = {})
    gzip(
      File.binread(file),
      options[:delete],
      options[:strategy]
    )
  end
end

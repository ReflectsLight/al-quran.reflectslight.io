# frozen_string_literal: true

class Nanoc::Filters::Strip < Nanoc::Filter
  identifier :strip
  type text: :text

  def run(content, options = {})
    content.each_line.reject { _1.strip.empty? }.join
  end
end

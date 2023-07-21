# frozen_string_literal: true

class Nanoc::Filters::MinifyJSON < Nanoc::Filter
  require "json"
  identifier :minify_json
  type text: :text

  def run(content, options = {})
    JSON.dump(JSON.parse(content))
  end
end

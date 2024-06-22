# frozen_string_literal: true

module Utils::Inline
  def inline_css(path)
    class_name = File.basename(path, File.extname(path))
    %|<style class="css #{class_name}">| \
    "#{items[path.sub(".css", ".scss")].compiled_content}" \
    "</style>"
  end
end

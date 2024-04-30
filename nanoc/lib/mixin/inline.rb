# frozen_string_literal: true

module Mixin::Inline
  def inline_json(path, class_name: File.basename(path, File.extname(path)))
    "<script class='json #{class_name}' type='application/json'>" \
    "#{items[path].compiled_content}" \
    "</script>"
  end

  def inline_css(path)
    class_name = File.basename(path, File.extname(path))
    "<style class='css #{class_name}'>" \
    "#{File.binread(File.join(build_dir, path))}" \
    "</style>"
  end
end

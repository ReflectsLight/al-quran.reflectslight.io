# frozen_string_literal: true

module Helper
  def inline_json(path)
    class_name = File.basename(path, File.extname(path))
    "<script class='json #{class_name}' type='application/json'>" \
    "#{items[path].compiled_content}" \
    "</script>"
  end
end
use_helper Helper

module Helper
  def inline_json(path)
    className = File.basename(path, File.extname(path))
    "<script class='json #{className}' type='application/json'>" \
    "#{items[path].compiled_content}" \
    "</script>"
  end
end
use_helper Helper

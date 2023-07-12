# frozen_string_literal: true

module Helper
  def inline_json(path)
    class_name = File.basename(path, File.extname(path))
    "<script class='json #{class_name}' type='application/json'>" \
    "#{items[path].compiled_content}" \
    "</script>"
  end

  def inline_css(path)
    class_name = File.basename(path, File.extname(path))
    "<style class='css #{class_name}'>" \
    "#{File.binread(File.join(build_dir, "css", "postman.css"))}" \
    "</style>"
  end

  def build_dir
    nanoc = Ryo.from YAML.load_file(File.join(Dir.getwd, "nanoc.yaml"))
    nanoc.output_dir
  end
end
use_helper Helper

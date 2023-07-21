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

  def t(locale, key, locals = {})
    str = [locale, *key.split(".")].inject(i18n) { |h, k| h[k] }
    format(str, locals)
  end

  def i18n
    @i18n ||= Ryo.from(
      JSON.parse(
        File.read(File.join(Dir.getwd, "src", "i18n.json"))
      )
    )
  end
end
use_helper Helper

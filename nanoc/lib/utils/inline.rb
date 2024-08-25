# frozen_string_literal: true

module Utils::Inline
  def inline_css(path)
    class_name = File.basename(path, File.extname(path))
    %|<style class="css #{class_name}">| \
    "#{items[path].compiled_content}" \
    "</style>"
  end

  def inline_json(path, context:, class_name: File.basename(path, File.extname(path)))
    ctx = Ryo.table_of(context).map { [_1.to_sym, _2] }.to_h
    path = format(path, ctx)
    %|<script type='application/json' class="json #{class_name}">| \
    "#{items[path].compiled_content}" \
    "</script>"
  end
end

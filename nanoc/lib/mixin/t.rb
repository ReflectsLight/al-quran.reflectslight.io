# frozen_string_literal: true

module Mixin::T
  def t(locale, key, local_assigns = {})
    str = [locale, *key.split(".")].inject(tdata) { _1[_2] }
    format(str, local_assigns)
  end

  def tdata
    @tdata ||= Ryo.from_json_file File.join(
                                    Dir.getwd,
                                    "src",
                                    "json",
                                    "t.json"
                                  )
  end
end

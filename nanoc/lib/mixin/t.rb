# frozen_string_literal: true

module Mixin::T
  extend Memoize

  def t(locale, key, local_assigns = {})
    str = [locale, *key.split(".")].inject(i18n) { _1[_2] }
    format(str, local_assigns)
  end

  def i18n
    path = File.join(Dir.getwd, "src", "json", "i18n.json")
    json = File.binread(path)
    Ryo.from JSON.parse(json)
  end
  memoize :i18n
end

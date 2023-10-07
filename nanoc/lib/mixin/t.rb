module Mixin::T
  def t(locale, key, local_assigns = {})
    str = [locale, *key.split(".")].inject(i18n) { _1[_2] }
    format(str, local_assigns)
  end

  def i18n
    @i18n ||= Ryo.from(
      JSON.parse(
        File.read(File.join(Dir.getwd, "src", "i18n.json"))
      )
    )
  end
end

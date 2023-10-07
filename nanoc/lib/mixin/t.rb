module Mixin::T
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

# frozen_string_literal: true

##
# The {Utils::T Utils::T} module provides a method that
# can render user-facing text strings in different
# locales / languages
module Utils::T
  ##
  # @param [String] locale
  #  Locale (eg "en")
  # @param [String] key
  #  Translation key (eg "TheNobleQuran")
  # @param [Hash] local_assigns
  #  Template variables
  # @return [String]
  def t(locale, key, local_assigns = {})
    str = [locale, *key.split(".")].inject(tdata) { _1[_2] }
    format(str, local_assigns)
  end

  private

  def tdata
    @tdata ||= Ryo.from_json(path: File.join(dirs.content, "json", "t.json"))
  end
end

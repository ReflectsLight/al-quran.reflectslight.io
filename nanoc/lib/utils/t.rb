# frozen_string_literal: true

##
# The {Utils::T Utils::T} module provides a method that
# can render user-facing text strings in different
# locales / languages
module Utils::T
  ##
  # @param [#to_s] num
  #  A western numeral
  # @return [String]
  #  The numeral as an Eastern Arabic numeral
  def n(locale, num)
    if ["ar", "fa"].include?(locale)
      num.to_s.each_char.map do |c|
        eastern_numerals.fetch(c)
      end.join
    else
      num.to_s
    end
  end

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

  def eastern_numerals
    @eastern_numerals ||= {
      "0" => "٠", "1" => "١", "2" => "٢", "3" => "٣", "4" => "٤",
      "5" => "٥", "6" => "٦", "7" => "٧", "8" => "٨", "9" => "٩"
    }
  end
end

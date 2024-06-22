# frozen_string_literal: true

namespace :t do
  jsondir = File.join(dirs.content, "json")
  desc "Generate /json/<locale>/<surahid>/info.json from surahs.json"
  task :"surahs.json" do
    require "json"
    surahs = JSON.parse File.read(File.join(jsondir, "surahs.json"))
    surahs.keys.each do |locale|
      surahs[locale].each.with_index(1) do |surah, index|
        target = File.join(jsondir, locale, index.to_s, "info.json")
        File.write(target, JSON.pretty_generate(surah))
      end
    end
  end
end

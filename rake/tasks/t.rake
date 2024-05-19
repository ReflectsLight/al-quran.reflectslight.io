# frozen_string_literal: true

namespace :t do
  desc "Generate /json/<locale>/<surahid>/info.json from surahs.json"
  task :"surahs.json" do
    require "json"
    path   = File.join(Dir.getwd, "src", "json", "surahs.json")
    surahs = JSON.parse(File.read(path))
    surahs.keys.each do |locale|
      surahs[locale].each.with_index(1) do |surah, index|
        target = File.join(Dir.getwd, "src", "json", locale, index.to_s, "info.json")
        File.write(target, JSON.pretty_generate(surah))
      end
    end
  end
end

# frozen_string_literal: true

namespace :t do
  desc "Generate /json/<locale>/<surahid>/info.json from surahs.json"
  task :"surahs.json" do
    surahs = Ryo.from_json(path: File.join(dirs.content, "json", "surahs.json"))
    Ryo.properties_of(surahs).each do |locale|
      surahs[locale].each.with_index(1) do |surah, index|
        File.write File.join(dirs.content, "json", locale, index.to_s, "info.json"),
                   JSON.pretty_generate(Ryo.table_of(surah, recursive: true))
      end
    end
  end
end

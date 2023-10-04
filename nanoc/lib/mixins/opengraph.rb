use_helper Module.new {
  require_relative "helper"
  include Helper

  def opengraph(locale, basename, options = {})
    erb "opengraph.html.erb", local_assigns(locale, basename, options)
  end

  def local_assigns(locale, basename, options)
    case basename
    when "stream.html.erb"
      surah_id = options[:surah_id]
      { title: t(locale, "TheNobleQuran"),
        description: t(locale, "meta.stream.description"),
        url: "https://al-quran.reflectslight.io/#{locale}/#{surah_id}/",
        image: "https://al-quran.reflectslight.io/images/opengraph/#{surah_id}.png" }
    end
  end
}

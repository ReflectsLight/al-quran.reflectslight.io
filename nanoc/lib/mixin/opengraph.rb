# frozen_string_literal: true

module Mixin::OpenGraph
  def opengraph(context)
    erb "partials/opengraph.html.erb", local_assigns(context)
  end

  def local_assigns(context)
    case context.filename
    when "stream.html.erb"
      surah = context.surah
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.stream.description", surah_name: surah.name),
       url: "https://al-quran.reflectslight.io/#{context.locale}/#{surah.slug}/",
       image: "https://al-quran.reflectslight.io/images/opengraph/#{surah.id}.png"}
    when "index.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.index.description"),
       url: "https://al-quran.reflectslight.io/#{context.locale}/",
       image: "https://al-quran.reflectslight.io/images/opengraph/quran.png"}
    end
  end
end

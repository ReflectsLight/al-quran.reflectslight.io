# frozen_string_literal: true

module Mixin::OpenGraph
  def opengraph(context)
    erb "_opengraph.html.erb", local_assigns(context)
  end

  def local_assigns(context)
    case context.filename
    when "surah-stream.html.erb"
      surah = context.surah
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.stream.description", surah_name: surah.name),
       url: "https://al-quran.reflectslight.io/#{context.locale}/#{surah.slug}/",
       image: "https://al-quran.reflectslight.io/images/og/#{surah.id}.png"}
    when "redirect.html.erb", "surah-index.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.index.description"),
       url: "https://al-quran.reflectslight.io/#{context.locale}/",
       image: "https://al-quran.reflectslight.io/images/og/0.png"}
    end
  end
end

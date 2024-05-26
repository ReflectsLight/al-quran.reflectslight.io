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
       description: surah.name,
       url: "https://#{hostname}/#{context.locale}/#{surah.slug}/",
       image: "https://#{hostname}/images/og/#{surah.id}.png"}
    when "redirect.html.erb", "surah-index.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.index.description"),
       url: "https://#{hostname}/#{context.locale}/",
       image: "https://#{hostname}/images/og/0.png"}
    when "random.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.random.description"),
       url: "https://#{hostname}/#{context.locale}/random/",
       image: "https://#{hostname}/images/og/0.png"}
    end
  end
end

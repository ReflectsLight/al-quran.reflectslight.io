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
       url: "#{base_url}/#{context.locale}/#{surah.slug}/",
       image: "#{base_url}/images/og/#{surah.id}.png?v=#{revision}"}
    when "redirect.html.erb", "surah-index.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.index.description"),
       url: "#{base_url}/#{context.locale}/",
       image: "#{base_url}/images/og/0.png"}
    when "random.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.random.description"),
       url: "#{base_url}/#{context.locale}/random/",
       image: "#{base_url}/images/og/0.png"}
    end
  end
end

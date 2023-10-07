# frozen_string_literal: true

module Mixin::OpenGraph
  def opengraph(context)
    erb "partials/opengraph.html.erb", local_assigns(context)
  end

  def local_assigns(context)
    case context.filename
    when "stream.html.erb"
      {title: t(context.locale, "TheNobleQuran"),
       description: t(context.locale, "meta.stream.description"),
       url: "https://al-quran.reflectslight.io/#{context.locale}/#{context.surah.slug}/",
       image: "https://al-quran.reflectslight.io/images/opengraph/#{context.surah.id}.png"}
    end
  end
end

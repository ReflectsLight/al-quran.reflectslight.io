use_helper Module.new {
  require_relative "helper"
  include Helper

  def opengraph(context)
    erb "opengraph.html.erb", local_assigns(context)
  end

  def local_assigns(context)
    case context.filename
    when "stream.html.erb"
      { title: t(context.locale, "TheNobleQuran"),
        description: t(context.locale, "meta.stream.description"),
        url: "https://al-quran.reflectslight.io/#{context.locale}/#{context.surah.slug}/",
        image: "https://al-quran.reflectslight.io/images/opengraph/#{context.surah.id}.png" }
    end
  end
}

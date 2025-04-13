import { Quran, Surah, TSurah } from "Quran"

import { App } from "~/components/App"
import { SurahIndex } from "~/components/SurahIndex"
import { T } from "~/lib/t"
;(function () {
  const doc = document.documentElement
  const root = doc.querySelector(".root")!
  const t = T(require("@json/t.json"))
  const byLocale = require("@json/surahs")
  const locale = (() => {
    return Quran.locales.find((ll) => ll.name === doc.lang)
  })()!
  const surahs: Surah[] = byLocale[locale.name].map((e: TSurah) => new Surah(e))

  /*
   * Render an instance of App
   */
  const AppComponent = (
    <App>
      <SurahIndex locale={locale} surahs={surahs} t={t} />
    </App>
  )
  render(AppComponent, root)
})()

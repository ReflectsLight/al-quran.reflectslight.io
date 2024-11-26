import { Quran, Surah, TSurah } from "Quran";
import { T } from "~/lib/t";
import { SurahStream } from "~/components/SurahStream";

(function () {
  const doc = document.documentElement;
  const root = doc.querySelector(".root")!;
  const t = T(require("@json/t.json"));
  const locale = (() => {
    return Quran.locales.find((ll) => ll.name === doc.lang);
  })()!;

  /*
   * Configure an instance of Surah
   */
  const el: HTMLScriptElement = doc.querySelector(".json.surah")!;
  const json: TSurah = JSON.parse(el.innerText)!;
  const surah = new Surah(json);
  render(<SurahStream surah={surah} locale={locale} t={t} />, root);
})();

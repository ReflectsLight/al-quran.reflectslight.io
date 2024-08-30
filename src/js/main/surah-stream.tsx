import { Quran, Surah, Ayah, TSurah } from "Quran";
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
  const node1: HTMLScriptElement = doc.querySelector(".json.info")!;
  const node2: HTMLScriptElement = doc.querySelector(".json.surah")!;
  const node3: HTMLScriptElement = doc.querySelector(".json.durations")!;
  const blob1: TSurah = JSON.parse(node1.innerText)!;
  const blob2: Array<[number, string]> = JSON.parse(node2.innerText)!;
  const blob3: Array<[number, number]> = JSON.parse(node3.innerText)!;
  const surah = new Surah(blob1);
  for (let i = 0; i < blob2.length; i++) {
    const [id, body] = blob2[i] as [number, string];
    surah.ayat.push(new Ayah({ id, body }));
  }
  for (let i = 0; i < surah.ayat.length; i++) {
    const ayah = surah.ayat[i];
    const [, ms] = blob3[i];
    ayah.ms = ms * 1000;
  }

  render(<SurahStream surah={surah} locale={locale} t={t} />, root);
})();

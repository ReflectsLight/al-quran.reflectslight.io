import { Surah, Ayah, TAyat, TSurah, TLocale } from "Quran";
import React from "react";
import ReactDOM from "react-dom/client";
import { T } from "~/lib/t";
import { SurahStream } from "~/components/SurahStream";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as TLocale;
  const t = T(require("@json/t.json"));

  /*
   * Configure an instance of Surah
   */
  const node1: HTMLScriptElement = document.querySelector(".json.surahinfo")!;
  const node2: HTMLScriptElement = document.querySelector(".json.surah")!;
  const node3: HTMLScriptElement = document.querySelector(".json.durations")!;
  const blob1: TSurah = JSON.parse(node1.innerText)!;
  const blob2: [number, string][] = JSON.parse(node2.innerText)!;
  const blob3: [number, number][] = JSON.parse(node3.innerText)!;
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

  ReactDOM.createRoot(root).render(
    <SurahStream surah={surah} locale={locale} t={t} />,
  );
})();

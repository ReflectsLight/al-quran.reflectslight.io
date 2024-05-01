import { Surah, Ayah, TSurah, TLocale } from "Quran";
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
  const node1: HTMLScriptElement = document.querySelector("script.surah")!;
  const node2: HTMLScriptElement = document.querySelector(".json.durations")!;
  const blob1: [TSurah, [number, string]] = JSON.parse(node1.innerText)!;
  const blob2: Array<[number, number]> = JSON.parse(node2.innerText)!;
  const surah = new Surah(blob1[0]);
  for (let i = 1; i < blob1.length; i++) {
    const [id, body] = blob1[i] as [number, string];
    surah.ayat.push(new Ayah({ id, body }));
  }
  for (let i = 0; i < surah.ayat.length; i++) {
    const ayah = surah.ayat[i];
    const [, ms] = blob2[i];
    ayah.ms = ms * 1000;
  }

  ReactDOM.createRoot(root).render(
    <SurahStream surah={surah} locale={locale} t={t} />,
  );
})();

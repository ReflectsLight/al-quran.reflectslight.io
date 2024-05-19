import React from "react";
import ReactDOM from "react-dom/client";
import { Surah, TSurah, TLocale } from "Quran";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";
import { Quran } from "Quran";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const t = T(require("@json/t.json"));
  const byLocale = require("@json/surahs");
  const appVersion = root.getAttribute("data-app-version")!;
  const locale = (() => {
    const l = root.getAttribute("data-locale");
    return Quran.locales.find(ll => ll.name === l);
  })()!;
  const surahs: Surah[] = byLocale[locale.name].map((e: TSurah) => new Surah(e));

  ReactDOM.createRoot(root).render(
    <SurahIndex appVersion={appVersion} locale={locale} surahs={surahs} t={t} />,
  );
})();

import { Surah, TSurah, Quran } from "Quran";
import React from "react";
import ReactDOM from "react-dom/client";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";

(function () {
  const doc = document.documentElement;
  const root = doc.querySelector(".root")!;
  const t = T(require("@json/t.json"));
  const byLocale = require("@json/surahs");
  const locale = (() => {
    return Quran.locales.find((ll) => ll.name === doc.lang);
  })()!;
  const surahs: Surah[] = byLocale[locale.name].map(
    (e: TSurah) => new Surah(e),
  );

  ReactDOM.createRoot(root).render(
    <SurahIndex locale={locale} surahs={surahs} t={t} />,
  );
})();

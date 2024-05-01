import React from "react";
import ReactDOM from "react-dom/client";
import { Surah, TSurah, TLocale } from "Quran";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as TLocale;
  const surahs: Surah<TSurah>[] = require("@json/surahs").map((e: TSurah) => new Surah(e));
  const t = T(require("@json/t.json"));
  ReactDOM.createRoot(root).render(
    <SurahIndex locale={locale} surahs={surahs} t={t} />,
  );
})();

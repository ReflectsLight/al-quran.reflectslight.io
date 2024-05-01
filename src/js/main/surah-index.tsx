import React from "react";
import ReactDOM from "react-dom/client";
import { Surah, TSurah, TLocale } from "Quran";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as TLocale;
  const appVersion = root.getAttribute("data-app-version") as string;
  const t = T(require("@json/t.json"));
  const surahs: Surah[] = require("@json/surahs").map(
    (e: TSurah) => new Surah(e),
  );
  ReactDOM.createRoot(root).render(
    <SurahIndex
      appVersion={appVersion}
      locale={locale}
      surahs={surahs}
      t={t}
    />,
  );
})();

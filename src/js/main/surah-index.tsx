import * as Quran from "lib/Quran";
import React from "react";
import ReactDOM from "react-dom/client";
import { i18n } from "lib/i18n";
import { SurahIndex } from "components/SurahIndex";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as Quran.Locale;
  const script: HTMLScriptElement = document.querySelector(".json.surahs")!;
  const t = i18n(document.querySelector<HTMLElement>(".json.i18n")!.innerText);
  const surahs: Quran.Surah[] = JSON.parse(script.innerText).map(
    (el: Quran.JSON.Surah) => {
      return Quran.Surah.fromJSON(locale, el);
    },
  );

  ReactDOM.createRoot(root).render(
    <SurahIndex locale={locale} surahs={surahs} t={t} />,
  );
})();

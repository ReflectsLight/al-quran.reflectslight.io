import React from "react";
import ReactDOM from "react-dom/client";
import { Surah, TSurah, TLocale } from "Quran";
import { i18n } from "~/lib/i18n";
import { SurahIndex } from "~/components/SurahIndex";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as TLocale;
  const script: HTMLScriptElement = document.querySelector(".json.surahs")!;
  const blob = JSON.parse(script.innerText);
  const surahs: Surah<TSurah>[] = blob.map((el: TSurah) => new Surah(el));
  const t = i18n(document.querySelector<HTMLElement>(".json.i18n")!.innerText);
  ReactDOM.createRoot(root).render(
    <SurahIndex locale={locale} surahs={surahs} t={t} />,
  );
})();

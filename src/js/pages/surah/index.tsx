import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";
import { get as getCookie } from "es-cookie";
import * as Quran from "lib/Quran";
import { SelectOption } from "components/Select";
import { ThemeSelect } from "components/ThemeSelect";
import { LanguageSelect } from "components/LanguageSelect";
import { i18n, formatNumber, TFunction } from "lib/i18n";

interface Props {
  locale: Quran.Locale;
  surahs: Quran.Surah[];
  t: TFunction;
}

function SurahIndex({ locale, surahs, t }: Props) {
  const [theme, setTheme] = useState(getCookie("theme") || "moon");
  const onLanguageChange = (o: SelectOption) => {
    document.location.replace(`/${o.value}/`);
  };

  return (
    <div className={classNames("content", "theme", theme, locale)}>
      <div className="header">
        <a href={"/" + locale} className="image" />
      </div>
      <div className="row title">{t(locale, "TheNobleQuran")}</div>
      <div className="row dropdown-row">
        <ThemeSelect theme={theme} setTheme={setTheme} />
        <LanguageSelect locale={locale} onChange={onLanguageChange} />
      </div>
      <ul className="body index scroll-y">
        {surahs.map((surah, key) => (
          <li className="surah" key={key}>
            <a href={`/${locale}/${surah.slug}`}>
              <div className="surah id">{formatNumber(surah.id, locale)}</div>
              <div className="surah name">{surah.localizedName}</div>
              <div className="surah name transliterated" lang="en">
                {surah.transliteratedName}
              </div>
            </a>
          </li>
        ))}
      </ul>
      <a href={`/${locale}/random`} className="row surah choose-random">
        {t(locale, "ChooseRandomChapter")}
      </a>
    </div>
  );
}

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

  ReactDOM.createRoot(root).render(<SurahIndex locale={locale} surahs={surahs} t={t} />);
})();

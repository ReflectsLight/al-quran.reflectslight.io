import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";

import * as Quran from "lib/Quran";
import { useTheme } from "hooks/useTheme";
import { ThemeSelect } from "components/ThemeSelect";
import { LanguageSelect } from "components/LanguageSelect";
import { i18n, formatNumber, TFunction } from "lib/i18n";
import { RightArrow } from "components/Icon";

interface Props {
  locale: Quran.Locale;
  surahs: Quran.Surah[];
  t: TFunction;
}

function SurahIndex({ locale, surahs, t }: Props) {
  const [theme, setTheme] = useTheme();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const div = ref.current;
      div.classList.remove("invisible");
    }
  }, [ref.current, theme]);

  return (
    <div
      ref={ref}
      className={classNames("invisible", "content", "theme", theme, locale)}
    >
      <header>
        <h1>
          <a href={`/${locale}/`}>{t(locale, "TheNobleQuran")}</a>
        </h1>
        <nav>
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <LanguageSelect locale={locale} />
        </nav>
      </header>
      <ul className="body index scroll-y">
        {surahs.map((surah, key) => (
          <li className="surah" key={key}>
            <a href={`/${locale}/${surah.slug}/`}>
              <div>
                <span className="id">{formatNumber(surah.id, locale)}</span>
                <span className="name">{surah.localizedName}</span>
              </div>

              <div className="transliterated" lang="en">
                {surah.transliteratedName}
              </div>
            </a>
          </li>
        ))}
      </ul>
      <footer>
        <a href={`/${locale}/random/`}>
          <RightArrow />
          <span>{t(locale, "ChooseRandomChapter")}</span>
        </a>
      </footer>
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

  ReactDOM.createRoot(root).render(
    <SurahIndex locale={locale} surahs={surahs} t={t} />,
  );
})();

import React, { useRef, useState, useEffect } from "react";
import * as Quran from "~/lib/Quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/i18n";
import { RightArrow } from "~/components/Icon";
import { Head } from "~/components/Head";
import { SurahIndexFilter } from "~/components/SurahIndexFilter";
import classNames from "classnames";

interface Props {
  locale: Quran.Locale;
  surahs: Quran.Surah[];
  t: TFunction;
}

export function SurahIndex({ locale, surahs, t }: Props) {
  const [theme, setTheme] = useTheme();
  const [index, setIndex] = useState<Quran.Surah[]>(surahs);
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
      className={classNames(
        "flex flex-col invisible h-full content surah-index theme",
        theme,
        locale,
      )}
    >
      <Head locale={locale} theme={theme} setTheme={setTheme} >
        {t(locale, "TheNobleQuran")}
      </Head>
      <ul className="body index scroll-y list-none p-0 m-0 h-5/6">
        {index.map((surah, key) => (
          <li className="surah" key={key}>
            <a
              className="flex items-center h-10 color-primary no-underline"
              href={`/${locale}/${surah.slug}/`}
            >
              <span className="color-secondary font-extrabold w-10 text-center">
                {formatNumber(surah.id, locale)}
              </span>
              <span>{surah.localizedName}</span>
              <span
                className="flex justify-end grow pr-3 transliterated"
                lang="en"
              >
                {surah.transliteratedName}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <footer className="flex flex-row justify-between h-16">
        <a
          className="flex flex-row items-center no-underline"
          href={`/${locale}/random/`}
        >
          <RightArrow />
          <span className="pl-3">{t(locale, "ChooseRandomChapter")}</span>
        </a>
        <SurahIndexFilter
          t={t}
          locale={locale}
          surahs={surahs}
          setIndex={setIndex}
        />
      </footer>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import type { Surah, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/t";
import { RightArrow } from "~/components/Icon";
import { Head } from "~/components/Head";
import { Filter } from "./Filter";
import classNames from "classnames";

type Props = {
  appVersion: string;
  locale: TLocale;
  surahs: Surah[];
  t: TFunction;
};

export function SurahIndex({ appVersion, locale, surahs, t }: Props) {
  const [theme, setTheme] = useTheme();
  const [index, setIndex] = useState<Surah[]>(surahs);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.classList.remove("invisible");
    }
  }, [ref.current, theme]);

  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-col invisible h-full content surah-index theme",
        theme,
        locale.name,
        locale.direction,
      )}
    >
      <Head locale={locale} theme={theme} setTheme={setTheme}>
        {t(locale, "TheNobleQuran")}
      </Head>
      <ul className="body index scroll-y list-none p-0 m-0 h-5/6">
        {index.map((surah, key) => (
          <li className="surah" key={key}>
            <a
              className={classNames("flex items-center color-primary no-underline", {
                "h-14": locale.direction === "ltr",
                "h-10": locale.direction === "rtl",
              })}
              href={`/${locale.name}/${surah.roman.slug}/`}
            >
              <span className="color-secondary font-extrabold w-10 text-center">
                {formatNumber(locale, surah.id)}
              </span>
              <span>{surah.name}</span>
              {locale.direction === "ltr" && (
                <div className="flex justify-end grow pr-3">
                  <div className="flex flex-col">
                    <span className="transliterated" lang="en">
                      {surah.roman.name}
                    </span>
                    <span className="ayat flex justify-end text-sm">
                      {formatNumber(locale, surah.numberOfAyah)} {t(locale, "ayat")}
                    </span>
                  </div>
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
      <footer className="flex flex-row justify-between h-16">
        <a
          className="flex flex-row items-center no-underline"
          href={`/${locale.name}/random/`}
        >
          {locale.direction === "ltr" && <RightArrow />}
          <span
            className={classNames({
              "text-base": locale.direction === "rtl",
              "pl-3": locale.direction === "ltr",
            })}
          >
            {t(locale, "ChooseRandomChapter")}
          </span>
        </a>
        <Filter t={t} locale={locale} surahs={surahs} setIndex={setIndex} />
      </footer>
      <span className="appver flex justify-end mb-3 w-full font-mono text-xs font-bold">
        v{appVersion}
      </span>
    </div>
  );
}

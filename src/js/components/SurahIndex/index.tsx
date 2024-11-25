import type { Surah, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/t";
import { Head } from "~/components/Head";
import "@css/main/SurahIndex.scss";

type Props = {
  locale: TLocale;
  surahs: Surah[];
  t: TFunction;
};

export function SurahIndex({ locale, surahs, t }: Props) {
  const [theme, setTheme] = useTheme();
  const index = useMemo<Surah[]>(() => surahs, [surahs.length]);
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
      <ul
        lang={locale.name}
        className="flex flex-wrap body index scroll-y list-none m-0 p-0 pt-4 m-auto w-full h-5/6 text-lg"
      >
        {index.map((surah, key) => (
          <li
            className={classNames("flex justify-center surah", {
              "w-full": locale.direction === "ltr",
              "w-1/2": locale.direction === "rtl",
            })}
            key={key}
          >
            <a
              className="flex items-center color-primary no-underline rounded w-11/12 h-14"
              href={`/${locale.name}/${surah.urlName}/`}
            >
              {locale.direction === "ltr" ? (
                <span className="background-primary color-secondary ml-2 mr-3 font-extrabold w-10 text-center">
                  {formatNumber(locale, surah.id)}
                </span>
              ) : (
                <span className="flex items-center font-extrabold justify-center color-secondary background-primary w-8 h-8 p-1 ml-5 rounded">
                  {formatNumber(locale, surah.id)}
                </span>
              )}
              <span>{surah.name}</span>
              {locale.direction === "ltr" && (
                <div className="flex justify-end grow pr-3">
                  <div className="flex flex-col">
                    <span className="transliterated" lang="en">
                      {surah.translitName}
                    </span>
                    <span className="ayat flex justify-end text-sm">
                      {formatNumber(locale, surah.numberOfAyah)}{" "}
                      {t(locale, "ayat")}
                    </span>
                  </div>
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
      <footer className="flex flex-row justify-center mb-5 h-12 text-lg">
        <a
          className="flex flex-row items-center color-black no-underline"
          href={`/${locale.name}/random/`}
        >
          {t(locale, "ChooseRandomChapter")}
        </a>
      </footer>
    </div>
  );
}

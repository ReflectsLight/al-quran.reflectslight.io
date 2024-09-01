import type { Surah, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/t";
import { Arrow } from "~/components/Icon";
import { Head } from "~/components/Head";
import { LanguageSelect, ThemeSelect } from "~/components/Select";
import { Filter } from "./Filter";
import "@css/main/SurahIndex.scss";

type Props = {
  locale: TLocale;
  surahs: Surah[];
  t: TFunction;
};

export function SurahIndex({ locale, surahs, t }: Props) {
  const [theme, setTheme] = useTheme();
  const [index, setIndex] = useState<Surah[]>(surahs);
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeEl = useMemo(
    () => document.activeElement,
    [document.activeElement]
  )

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "SoftLeft") {
        setShowLangDropdown(!showLangDropdown);
      } else if (e.key === "SoftRight") {
        setShowThemeDropdown(!showThemeDropdown);
      }
    };
    activeEl.addEventListener("keydown", onKeyPress);
    return () => activeEl.removeEventListener("keydown", onKeyPress);
  }, [activeEl, showLangDropdown, showThemeDropdown]);

  useEffect(() => {
    const el = rootRef.current;
    if (el) {
      el.classList.remove("invisible");
    }
  }, [rootRef.current, theme]);

  return (
    <div
      ref={rootRef}
      className={classNames(
        "flex flex-col invisible h-full content surah-index theme",
        theme,
        locale.name,
        locale.direction,
      )}
    >
      <Head title={t(locale, "TheNobleQuran")} locale={locale}>
        <LanguageSelect
          isOpen={showLangDropdown}
          setIsOpen={setShowLangDropdown}
          locale={locale}
        />
        <ThemeSelect
          isOpen={showThemeDropdown}
          setIsOpen={setShowThemeDropdown}
          theme={theme}
          setTheme={setTheme}
        />
      </Head>
      <ul className="flex flex-wrap body index scroll-y list-none m-0 p-0 w-full h-full">
        {index.map((surah, key) => (
          <li
            className={classNames("flex justify-center surah", {
              "w-full": locale.direction === "ltr",
              "w-1/2": locale.direction === "rtl",
            })}
            key={key}
          >
            <a
              className="flex items-center color-primary no-underline rounded w-11/12 h-8"
              href={`/${locale.name}/${surah.urlName}/index.html`}
            >
              <span className="background-secondary color-white rounded flex w-8 font-extrabold w-5 mr-3 justify-center text-center">
                {formatNumber(locale, surah.id)}
              </span>
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
      <footer className="flex flex-row justify-between mb-5 h-12">
        <a
          className="flex flex-row items-center no-underline"
          href={`/${locale.name}/random/`}
        >
          {locale.direction === "ltr" ? (
            <Arrow direction="right" />
          ) : (
            <Arrow direction="left" />
          )}
          <span
            className={classNames({
              "pl-3": locale.direction === "ltr",
              "pr-3": locale.direction === "rtl",
            })}
          >
            {t(locale, "ChooseRandomChapter")}
          </span>
        </a>
        <Filter t={t} locale={locale} surahs={surahs} setIndex={setIndex} />
      </footer>
    </div>
  );
}

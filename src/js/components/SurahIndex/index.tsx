import "@css/main/SurahIndex.scss"

import type { Surah, TLocale } from "Quran"

import { EditSettings } from "~/components/EditSettings"
import { Head } from "~/components/Head"
import { useSettingsContext } from "~/contexts/SettingsContext"
import { formatNumber, TFunction } from "~/lib/t"

type Props = {
  locale: TLocale
  surahs: Surah[]
  t: TFunction
}

export function SurahIndex({ locale, surahs, t }: Props) {
  const { theme, editSettings } = useSettingsContext()
  const index = useMemo<Surah[]>(() => surahs, [surahs.length])
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={classNames("flex flex-col h-full content surah-index theme", theme, locale.name, locale.direction)}
    >
      <Head title={t(locale, "chapters")} locale={locale}>
        {t(locale, "TheNobleQuran")}
      </Head>
      <EditSettings t={t} locale={locale} hidden={!editSettings} />
      <ul lang={locale.name} className="flex flex-wrap body index scroll-y list-none m-0 p-0 pt-4 m-auto w-full h-5/6">
        {index.map((surah, key) => (
          <li className="flex justify-center surah w-full" key={key}>
            <a
              className="flex items-center no-underline rounded w-11/12 h-14"
              href={`/${locale.name}/${surah.urlName}/`}
            >
              {locale.direction === "ltr" ? (
                <span data-surahid={surah.id} className="ml-2 mr-3 font-semibold w-10 text-center border-secondary">
                  {formatNumber(locale, surah.id)}
                </span>
              ) : (
                <span
                  data-surahid={surah.id}
                  className="flex items-center font-extrabold justify-center w-8 h-8 p-1 ml-5 rounded border-secondary"
                >
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
                      {formatNumber(locale, surah.numberOfAyah)} {t(locale, "ayat")}
                    </span>
                  </div>
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
      <footer className="flex flex-row justify-center mb-5 h-12">
        <a className="flex flex-row items-center no-underline" href={`/${locale.name}/random/`}>
          {t(locale, "ChooseRandomChapter")}
        </a>
      </footer>
    </div>
  )
}

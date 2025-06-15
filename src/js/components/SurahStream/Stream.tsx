import classNames from "classnames"
import type { Ayah, Surah, TAyat, TLocale } from "Quran"

import { AudioControl } from "~/components/AudioControl"
import { useAudio } from "~/hooks/useAudio"
import { formatNumber, TFunction } from "~/lib/t"

type Props = {
  locale: TLocale
  surah: Surah
  stream: TAyat
  endOfStream: boolean
  isPaused: boolean
  t: TFunction
}

export function Stream({ locale, surah, stream, endOfStream, isPaused, t }: Props) {
  const className = endOfStream || isPaused ? ["scroll-y"] : []
  const isArabic = locale.name === "ar"
  const isRTL = locale.direction === "rtl"
  const ref = useRef<HTMLUListElement>(null)
  const audio = useAudio()
  const ul = useMemo<JSX.Element>(() => {
    return (
      <ul
        lang={locale.name}
        className={classNames("body stream scroll-y list-none p-0 m-0 h-5/6 mt-4", ...className)}
        ref={ref}
      >
        {stream.map((ayah: Ayah) => {
          return (
            <li key={ayah.id} className="ayah fade mb-5">
              <span className="flex h-8 items-center color-primary">
                <AudioControl
                  className={classNames({ "mr-2": !isRTL, "ml-2": isRTL })}
                  hidden={!(isPaused || endOfStream)}
                  autoPlay={false}
                  audio={audio}
                  surah={surah}
                  ayah={ayah}
                />
                <span className="color-primary font-bold">
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")} {formatNumber(locale, ayah.id)} {t(locale, "of")}{" "}
                  {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p
                className={classNames("m-0", {
                  "text-xl mt-3": isArabic,
                })}
              >
                {ayah.body}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }, [stream.length, audio.isEnabled, audio.source, isPaused, endOfStream])

  useEffect(() => {
    const el = ref.current
    if (el) {
      const top = el.scrollHeight
      el.scrollTo({ behavior: "smooth", top })
    }
  }, [stream.length])

  useEffect(() => {
    if (audio.isEnded) {
      audio.disable()
    }
  }, [audio.isEnded])

  return ul
}

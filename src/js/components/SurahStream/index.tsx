import "@css/main/SurahStream.scss"

import type { Ayah, Surah, TAyat, TLocale } from "Quran"

import { AudioControl } from "~/components/AudioControl"
import { EditSettings } from "~/components/EditSettings"
import { Head } from "~/components/Head"
import { PauseIcon, PlayIcon, RefreshIcon, StalledIcon } from "~/components/Icon"
import { Timer } from "~/components/Timer"
import { useSettingsContext } from "~/contexts/SettingsContext"
import { useAudio } from "~/hooks/useAudio"
import { TFunction } from "~/lib/t"

import { Stream } from "./Stream"

type Maybe<T> = T | null | undefined

type Props = {
  surah: Surah
  locale: TLocale
  t: TFunction
}

export function SurahStream({ surah, locale, t }: Props) {
  const { theme, editSettings } = useSettingsContext()
  const [stream, setStream] = useState<TAyat>([])
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [endOfStream, setEndOfStream] = useState<boolean>(false)
  const audio = useAudio()
  const articleRef = useRef<HTMLElement>(null)
  const readyToRender = stream.length > 0
  const ayah: Maybe<Ayah> = stream[stream.length - 1]
  const isSearchEngineBot = useMemo(() => {
    const robots = [/Googlebot/i, /Bingbot/i, /BaiduSpider/i, /YandexBot/i, /DuckDuckBot/i]
    return robots.some((robot) => robot.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!endOfStream) {
      setStream([surah.ayat[0]])
    }
  }, [endOfStream])

  useEffect(() => {
    if (isSearchEngineBot) {
      setStream([...surah.ayat])
    }
  }, [])

  return (
    <article
      ref={articleRef}
      className={classNames("flex flex-col h-full content theme", locale.name, locale.direction, theme, {
        hidden: !readyToRender,
      })}
    >
      <Head title={surah.name} locale={locale}>
        {t(locale, "TheNobleQuran")}
      </Head>
      <EditSettings t={t} locale={locale} hidden={!editSettings} />
      <Stream surah={surah} stream={stream} locale={locale} endOfStream={endOfStream} isPaused={isPaused} t={t} />
      <footer className="flex justify-between items-center h-16 flex-row">
        <span
          className={classNames({
            hidden: endOfStream || audio.showStalledIcon,
          })}
        >
          {!endOfStream && isPaused && <PlayIcon onClick={() => setIsPaused(false)} />}
          {!endOfStream && !isPaused && <PauseIcon onClick={() => setIsPaused(true)} />}
        </span>
        {audio.showStalledIcon && <StalledIcon />}
        <span className={classNames({ hidden: !endOfStream })}>
          <RefreshIcon onClick={() => [setEndOfStream(false)]} />
        </span>
        <AudioControl audio={audio} surah={surah} ayah={ayah} hidden={endOfStream} />
        <Timer
          hidden={endOfStream}
          locale={locale}
          surah={surah}
          ayah={ayah}
          isPaused={isPaused}
          audio={audio}
          onComplete={(surah, ayah) => {
            const layah = surah.ayat[surah.ayat.length - 1]
            if (!layah || !ayah) {
              return
            } else if (layah.id === ayah.id) {
              setEndOfStream(true)
            } else {
              setStream([...stream, surah.ayat[ayah.id]])
            }
          }}
        />
      </footer>
    </article>
  )
}

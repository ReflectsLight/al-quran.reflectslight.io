import type { Surah, Ayah, TAyat, TLocale } from "Quran"
import { useTheme } from "~/hooks/useTheme"
import { useAudio } from "~/hooks/useAudio"
import { AudioControl } from "~/components/AudioControl"
import { Head } from "~/components/Head"
import { PlayIcon, PauseIcon, RefreshIcon, StalledIcon } from "~/components/Icon"
import { Timer } from "~/components/Timer"
import { TFunction } from "~/lib/t"
import { Stream } from "./Stream"
import "@css/main/SurahStream.scss"

type Maybe<T> = T | null | undefined

type Props = {
  surah: Surah
  locale: TLocale
  t: TFunction
}

export function SurahStream({ surah, locale, t }: Props) {
  const [stream, setStream] = useState<TAyat>([])
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [endOfStream, setEndOfStream] = useState<boolean>(false)
  const [theme, setTheme] = useTheme()
  const audio = useAudio()
  const articleRef = useRef<HTMLElement>(null)
  const readyToRender = stream.length > 0
  const ayah: Maybe<Ayah> = stream[stream.length - 1]
  const isRTL = locale.direction === "rtl"
  const isLTR = locale.direction === "ltr"
  const isSearchEngineBot = useMemo(() => {
    const robots = [/Googlebot/i, /Bingbot/i, /BaiduSpider/i, /YandexBot/i, /DuckDuckBot/i]
    return robots.some((robot) => robot.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    const el = articleRef.current
    if (el) {
      el.classList.remove("invisible")
    }
  }, [articleRef.current, theme])

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
      className={classNames("flex flex-col invisible h-full content theme", locale.name, locale.direction, theme, {
        hidden: !readyToRender,
      })}
    >
      <Head locale={locale} theme={theme} setTheme={setTheme}>
        {t(locale, "TheNobleQuran")}
      </Head>
      <Stream surah={surah} stream={stream} locale={locale} endOfStream={endOfStream} isPaused={isPaused} t={t} />
      <footer
        className={classNames("flex justify-between items-center h-16", {
          "flex-row-reverse": isRTL,
          "flex-row": isLTR,
        })}
      >
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
        <AudioControl audio={audio} surah={surah} ayah={ayah} hidden={endOfStream} />
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
      </footer>
    </article>
  )
}

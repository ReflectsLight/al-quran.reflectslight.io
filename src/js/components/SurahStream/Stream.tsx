import type { Surah, Ayah, TAyat, TLocale } from "Quran";
import { useAudio } from "~/hooks/useAudio";
import { AudioControl } from "~/components/AudioControl";
import { formatNumber, TFunction } from "~/lib/t";
import classNames from "classnames";

type Props = {
  locale: TLocale;
  surah: Surah;
  stream: TAyat;
  endOfStream: boolean;
  isPaused: boolean;
  t: TFunction;
};

export function Stream({ locale, surah, stream, endOfStream, isPaused, t }: Props) {
  const className = endOfStream || isPaused ? ["scroll-y"] : [];
  const isRTL = locale.direction === "rtl";
  const isLTR = locale.direction === "ltr";
  const ref = useRef<HTMLUListElement>(null);
  const audio = useAudio();
  const ul = useMemo<JSX.Element>(() => {
    return (
      <ul
        lang={locale.name}
        className={classNames(
          "body stream scroll-y text-lg list-none p-0 m-0 h-5/6 mt-4",
          ...className,
        )}
        ref={ref}
      >
        {stream.map((ayah: Ayah) => {
          return (
            <li
              key={ayah.id}
              className={classNames("ayah fade", {
                "mb-8": isRTL,
                "mb-5": !isRTL,
              })}
            >
              <span className="flex h-8 items-center color-primary">
                <AudioControl
                  className={classNames({ "mr-2": !isRTL, "ml-2": isRTL })}
                  hidden={!(isPaused || endOfStream)}
                  audio={audio}
                  surah={surah}
                  ayah={ayah}
                />
                <span
                  className={classNames("color-primary", {
                    "font-cairo-bold": isRTL,
                    "font-semibold font-kanit": isLTR,
                  })}
                >
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")} {formatNumber(locale, ayah.id)}{" "}
                  {t(locale, "of")} {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p
                className={classNames("m-0 color-secondary", {
                  "font-kanit": isLTR,
                  "font-amiri text-2xl mt-5": isRTL,
                })}
              >
                {ayah.body}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream.length, audio.isEnabled, isPaused, endOfStream]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const top = el.scrollHeight;
      el.scrollTo({ behavior: "smooth", top });
    }
  }, [stream.length]);

  useEffect(() => {
    if (audio.isEnded) {
      audio.disable();
    }
  }, [audio.isEnded]);

  return ul;
}

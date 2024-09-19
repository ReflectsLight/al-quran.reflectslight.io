import type { Surah, Ayah, TAyat, TLocale } from "Quran";
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

export function Stream({
  locale,
  surah,
  stream,
  endOfStream,
  isPaused,
  t,
}: Props) {
  const className = endOfStream || isPaused ? ["scroll-y"] : [];
  const isArabic = locale.name === "ar";
  const isRTL = locale.direction === "rtl";
  const ref = useRef<HTMLUListElement>(null);
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
                "mb-12": isArabic,
                "mb-5": !isArabic,
              })}
            >
              <span className="flex h-8 items-center">
                <AudioControl
                  hidden={!(isPaused || endOfStream)}
                  audio={new Audio()}
                  surah={surah}
                  ayah={ayah}
                  onStatusChange={(status, [, disable]) => {
                    if (status === "end") {
                      disable();
                    }
                  }}
                />
                <span
                  className={classNames({
                    "color-primary font-extrabold": isRTL,
                  })}
                >
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")}{" "}
                  {formatNumber(locale, ayah.id)} {t(locale, "of")}{" "}
                  {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p className={classNames("m-0", { "text-2xl mt-2": isArabic })}>
                {ayah.body}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream.length, isPaused, endOfStream]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const top = el.scrollHeight;
      el.scrollTo({ behavior: "smooth", top });
    }
  }, [stream.length]);

  return ul;
}

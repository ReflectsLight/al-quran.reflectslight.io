import type { Surah, Ayah, TAyat, TLocale } from "Quran";
import { formatNumber, TFunction } from "~/lib/t";

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
  const ref = useRef<HTMLUListElement>(null);
  const ul = useMemo<JSX.Element>(() => {
    const ltr = locale.direction === "ltr";
    const rtl = locale.direction === "rtl";
    return (
      <ul
        lang={locale.name}
        className={classNames(
          "body stream scroll-y list-none p-0 m-0 h-5/6",
          ...className,
        )}
        ref={ref}
      >
        {stream.map((ayah: Ayah) => {
          return (
            <li
              key={ayah.id}
              className={classNames("ayah fade", { "mb-1": rtl || ltr })}
            >
              <span className="flex h-8 items-center">
                <span>
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")}{" "}
                  {formatNumber(locale, ayah.id)} {t(locale, "of")}{" "}
                  {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p className="m-0">{ayah.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream.length, isPaused, endOfStream]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.focus();
      el.scrollTop = el.scrollHeight;
    }
  }, [stream.length]);

  return ul;
}

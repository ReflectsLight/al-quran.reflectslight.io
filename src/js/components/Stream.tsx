import React, { useEffect, useMemo, useRef } from "react";
import { Surah, Ayah, TAyah, TAyat, TSurah, TLocale } from "Quran";
import { AudioControl } from "~/components/AudioControl";
import { formatNumber, TFunction } from "~/lib/t";
import classNames from "classnames";

type Props = {
  surah: Surah<TSurah>;
  stream: TAyat;
  locale: TLocale;
  endOfStream: boolean;
  isPaused: boolean;
  t: TFunction;
};

export function Stream({
  surah,
  stream,
  locale,
  endOfStream,
  isPaused,
  t,
}: Props) {
  const className = endOfStream || isPaused ? ["scroll-y"] : [];
  const ref = useRef<HTMLUListElement>();
  const ul = useMemo<JSX.Element>(() => {
    const ltr = locale === "en";
    const rtl = locale === "ar";
    return (
      <ul
        lang={locale}
        className={classNames(
          "body stream scroll-y list-none p-0 m-0 mt-1 h-5/6",
          ...className,
        )}
        ref={ref}
      >
        {stream.map((ayah: Ayah<TAyah>) => {
          return (
            <li
              key={ayah.id}
              className={classNames("ayah fade", { "mb-6": rtl, "mb-4": ltr })}
            >
              <span
                className={classNames("flex h-8 items-center", { "mb-2": rtl })}
              >
                <AudioControl
                  hidden={!(isPaused || endOfStream)}
                  audio={new Audio()}
                  surah={surah}
                  ayah={ayah}
                  onStatusChange={(status, [_, disable]) => {
                    if (status === "end") {
                      disable();
                    }
                  }}
                />
                <span>
                  {t(locale, "surah")} {formatNumber(surah.id, locale)}
                  {t(locale, "comma")} {t(locale, "ayah")}{" "}
                  {formatNumber(ayah.id, locale)} {t(locale, "of")}{" "}
                  {formatNumber(surah.ayat.length, locale)}
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
      const top = el.scrollHeight;
      el.scrollTo({ behavior: "smooth", top });
    }
  }, [stream.length]);

  return ul;
}

import React, { useEffect, useMemo, useRef } from "react";
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

export function Stream({ locale, surah, stream, endOfStream, isPaused, t }: Props) {
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
          { "mt-4": ltr, "mt-6": rtl },
        )}
        ref={ref}
      >
        {stream.map((ayah: Ayah) => {
          return (
            <li
              key={ayah.id}
              className={classNames("ayah fade", { "mb-6": rtl, "mb-4": ltr })}
            >
              <span className={classNames("flex h-8 items-center", { "mb-2": rtl })}>
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
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")} {formatNumber(locale, ayah.id)}{" "}
                  {t(locale, "of")} {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p className={classNames("m-0")}>{ayah.body}</p>
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

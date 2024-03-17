import React, { useEffect, useMemo, useRef } from "react";
import * as Quran from "~/lib/Quran";
import { AudioControl } from "~/components/AudioControl";
import { formatNumber, TFunction } from "~/lib/i18n";
import classNames from "classnames";

interface Props {
  recitation: Quran.Recitation;
  surah: Quran.Surah;
  stream: Quran.Ayat;
  locale: Quran.Locale;
  endOfStream: boolean;
  isPaused: boolean;
  t: TFunction;
}

export function Stream({
  recitation,
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
    return (
      <ul
        lang={locale}
        className={classNames(
          "body stream scroll-y list-none p-0 h-5/6",
          ...className,
        )}
        ref={ref}
      >
        {stream.map((ayah: Quran.Ayah) => {
          return (
            <li key={ayah.id} className="ayah fade">
              <span className="title">
                {(isPaused || endOfStream) && (
                  <AudioControl
                    recitation={recitation}
                    surah={surah}
                    ayah={ayah}
                    onEnd={turnOffSound => turnOffSound()}
                  />
                )}
                <span>
                  {t(locale, "surah")} {formatNumber(surah.id, locale)}
                  {t(locale, "comma")} {t(locale, "ayah")}{" "}
                  {formatNumber(ayah.id, locale)} {t(locale, "of")}{" "}
                  {formatNumber(surah.ayat.length, locale)}
                </span>
              </span>
              <p className="m-0 mb-3">{ayah.text}</p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream.length, isPaused]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const top = el.scrollHeight;
      el.scrollTo({ behavior: "smooth", top });
    }
  }, [stream.length]);

  return ul;
}

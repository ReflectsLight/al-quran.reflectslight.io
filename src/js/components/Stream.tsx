import React, { useEffect, useMemo, useRef } from "react";
import * as Quran from "lib/Quran";
import { AudioControl } from "components/AudioControl";
import { formatNumber, TFunction } from "lib/i18n";
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
  const className = classNames("body", "stream");
  const style: React.CSSProperties =
    endOfStream || isPaused ? { overflowY: "auto" } : { overflowY: "hidden" };
  const ref = useRef<HTMLUListElement>();
  const ul = useMemo<JSX.Element>(() => {
    return (
      <ul lang={locale} className={className} style={style} ref={ref}>
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
                  {formatNumber(ayah.id, locale)}
                </span>
              </span>
              <p>{ayah.text}</p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream.length]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const top = 1024 + el.scrollHeight + el.scrollTop;
      el.scrollBy({ behavior: "smooth", top });
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [stream.length]);

  return ul;
}

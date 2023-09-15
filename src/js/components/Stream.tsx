import * as Quran from "lib/Quran";
import React, { useEffect } from "react";
import { formatNumber, TFunction } from "lib/i18n";
import classNames from "classnames";

interface Props {
  surah: Quran.Surah;
  stream: Quran.Ayat;
  locale: Quran.Locale;
  endOfStream: boolean;
  isPaused: boolean;
  t: TFunction;
}

export function Stream({ surah, stream, locale, endOfStream, isPaused, t }: Props) {
  const className = classNames("body", "stream");
  const style: React.CSSProperties =
    endOfStream || isPaused ? { overflowY: "auto" } : { overflowY: "hidden" };
  const ayat = stream.map((ayah: Quran.Ayah) => {
    return (
      <li key={ayah.id} className="ayah fade">
        <span className="surah-id ayah-id">
          {t(locale, "surah")} {formatNumber(surah.id, locale)}
          {t(locale, "comma")} {t(locale, "ayah")} {formatNumber(ayah.id, locale)}
        </span>
        <p>{ayah.text}</p>
      </li>
    );
  });

  useEffect(() => {
    const ul: HTMLElement = document.querySelector("ul.stream")!;
    ul.scroll({ top: ul.scrollHeight, behavior: "smooth" });
  }, [stream]);

  return (
    <ul lang={locale} className={className} style={style}>
      {ayat}
    </ul>
  );
}

import { Surah, Ayat, Ayah, Locale } from "lib/Quran";
import React, { useEffect } from "react";
import { numbers, strings } from "lib/i18n";
import classNames from "classnames";

interface StreamProps {
  surah: Surah;
  stream: Ayat;
  locale: Locale;
}

export function Stream({ surah, stream, locale }: StreamProps) {
  const n = numbers(locale);
  const s = strings(locale);
  const endOfStream = stream.length === surah.ayat.length;
  const ayat = stream.map((ayah: Ayah) => {
    return (
      <li key={ayah.id.number} className="ayah fade">
        <span className="surah-id ayah-id">
          {s("surah")}{" "}
          {n(surah.id.localeKey)}
          {s("comma")}{" "}
          {s("ayah")}{" "}
          {n(ayah.id.localeKey)}
        </span>
        <p>{ayah.text}</p>
      </li>
    );
  });

  useEffect(() => {
    const el: HTMLElement = document.querySelector("ul.stream");
    el.scroll({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [stream]);

  return (
    <ul className={classNames("stream", { "scroll-y": endOfStream })}>
      {ayat}
    </ul>
  );
}

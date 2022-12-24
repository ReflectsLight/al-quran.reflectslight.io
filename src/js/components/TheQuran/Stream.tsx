import { Surah, Ayat, Ayah } from "lib/Quran";
import React, { useEffect } from "react";
import classNames from "classnames";

interface StreamProps {
  surah: Surah;
  stream: Ayat;
}

export function Stream({ surah, stream }: StreamProps) {
  const endOfStream = stream.length === surah.ayat.length;
  const ayat = stream.map((ayah: Ayah) => {
    return (
      <li key={ayah.id} className="ayah fade">
        <span className="surah-id ayah-id">
          Surah {surah.id}, Ayah {ayah.id}
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

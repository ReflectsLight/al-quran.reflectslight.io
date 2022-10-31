import { Surah, Ayat, Ayah } from "lib/Quran"
import React, { useState, useEffect } from 'react';
import classNames from "classnames";

type StreamProps = {
  surah: Surah,
  stream: Ayat
}

export function Stream({surah, stream}: StreamProps) {
  const endOfStream = stream.length === surah.ayat.length;
  const ayat = stream.map((ayah: Ayah) => {
    return (
      <li key={ayah.num} className="ayah fade">
        <span>Surah 1, Ayah {ayah.num}</span>
        <p>{ayah.text}</p>
      </li>
    );
  });

  useEffect(() => {
    const el: HTMLElement = document.querySelector("ul.stream");
    el.scroll({top: el.offsetHeight, behavior: "smooth"});
  }, [stream]);

  return (
    <ul className={classNames("stream", {"scroll-y": endOfStream})}>
      {ayat}
    </ul>
  );
}

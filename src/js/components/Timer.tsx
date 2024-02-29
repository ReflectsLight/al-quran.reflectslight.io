import React, { useEffect, useState } from "react";
import * as Quran from "lib/Quran";
import { formatNumber } from "lib/i18n";

interface Props {
  surah: Quran.Surah;
  locale: Quran.Locale;
  stream: Quran.Ayat;
  soundOn: boolean;
  setStream: (stream: Quran.Ayat) => void;
  setEndOfStream: (v: boolean) => void;
  isPaused: boolean;
  isStalled: boolean;
}

export function Timer({
  surah,
  stream,
  isStalled,
  soundOn,
  setStream,
  setEndOfStream,
  locale,
  isPaused,
}: Props) {
  const ayah = stream[stream.length - 1];
  const lastAyah = surah.ayat[surah.ayat.length - 1];
  const [ms, setMs] = useState(ayah.readTimeMs);

  useEffect(() => {
    setMs(ayah.readTimeMs);
  }, [ayah.id]);

  useEffect(() => {
    if (!soundOn) return;
    setMs(ayah.readTimeMs);
  }, [soundOn]);

  useEffect(() => {
    if ((soundOn && isStalled) || isPaused) {
      /* no-op */
    } else if (ms <= 0) {
      if (lastAyah.id === ayah.id) {
        setEndOfStream(true);
      } else {
        setStream([...stream, surah.ayat[ayah.id]]);
      }
    } else {
      const tid = setTimeout(() => setMs(ms - 100), 100);
      return () => clearTimeout(tid);
    }
  }, [soundOn, isStalled, isPaused, ms]);

  return (
    <div className="timer w-10 flex justify-end">
      {ms / 1000 <= 0
        ? formatNumber(0, locale)
        : formatNumber(ms / 1000, locale)}
    </div>
  );
}

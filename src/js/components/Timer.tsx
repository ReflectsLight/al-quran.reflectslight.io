import React, { useEffect } from "react";
import { Surah, TSurah, TLocale, TAyat } from "Quran";
import { formatNumber } from "~/lib/i18n";

type Props = {
  surah: Surah<TSurah>;
  locale: TLocale;
  stream: TAyat;
  soundOn: boolean;
  setStream: (stream: TAyat) => void;
  setEndOfStream: (v: boolean) => void;
  ms: number | null;
  setMs: (n: number) => void;
  isPaused: boolean;
  isStalled: boolean;
};

export function Timer({
  surah,
  stream,
  isStalled,
  soundOn,
  setStream,
  setEndOfStream,
  locale,
  isPaused,
  ms,
  setMs,
}: Props) {
  const ayah = stream[stream.length - 1];
  const lastAyah = surah.ayat[surah.ayat.length - 1];

  useEffect(() => {
    setMs(ayah.ms);
  }, [ayah.id]);

  useEffect(() => {
    if (!soundOn) return;
    setMs(ayah.ms);
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
    <div className="timer text-base w-10 flex justify-end">
      {ms / 1000 <= 0
        ? formatNumber(0, locale)
        : formatNumber(ms / 1000, locale)}
    </div>
  );
}

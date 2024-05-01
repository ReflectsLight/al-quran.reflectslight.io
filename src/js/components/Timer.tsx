import React, { useEffect } from "react";
import type { Surah, Ayah, TLocale, TAyat } from "Quran";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  surah: Surah;
  locale: TLocale;
  stream: TAyat;
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
  setStream,
  setEndOfStream,
  locale,
  isPaused,
  ms,
  setMs,
}: Props) {
  const ayah: Maybe<Ayah> = stream[stream.length - 1];
  const lastAyah: Maybe<Ayah> = surah.ayat[surah.ayat.length - 1];

  useEffect(() => {
    if (!ayah) {
      return;
    }
    setMs(ayah.ms);
  }, [ayah?.id]);

  useEffect(() => {
    if (!ayah || !lastAyah) {
      return;
    } else if (isStalled || isPaused) {
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
  }, [isStalled, isPaused, ms]);

  return (
    !isStalled && (
      <div className="timer text-base w-10 flex justify-end">
        {ms / 1000 <= 0
          ? formatNumber(0, locale)
          : formatNumber(ms / 1000, locale)}
      </div>
    )
  );
}

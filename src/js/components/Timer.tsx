import React, { useEffect } from "react";
import type { Surah, Ayah, TLocale, TAyat } from "Quran";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  locale: TLocale;
  surah: Surah;
  ayah: Maybe<Ayah>;
  isPaused: boolean;
  isStalled: boolean;
  ms: number | null;
  setMs: (n: number) => void;
  onComplete: (surah: Surah, ayah: Ayah) => void;
};

export function Timer({
  locale,
  surah,
  ayah,
  isStalled,
  isPaused,
  ms,
  setMs,
  onComplete,
}: Props) {
  useEffect(() => {
    if (ayah) {
      setMs(ayah.ms);
    }
  }, [ayah?.id]);

  useEffect(() => {
    if (!ayah) {
      return;
    } else if (isStalled || isPaused) {
      /* no-op */
    } else if (ms <= 0) {
      onComplete(surah, ayah);
    } else {
      const tid = setTimeout(() => setMs(ms - 100), 100);
      return () => clearTimeout(tid);
    }
  }, [isStalled, isPaused, ms]);

  return (
    !isStalled && (
      <div className="timer text-base w-10 flex justify-end">
        {ms / 1000 <= 0
          ? formatNumber(locale, 0)
          : formatNumber(locale, ms / 1000)}
      </div>
    )
  );
}

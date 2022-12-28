import React, { useEffect, useState } from 'react';
import { Surah, Ayat, Locale } from 'lib/Quran';
import { numberToDecimal } from 'lib/i18n';

interface Props {
  surah: Surah
  locale: Locale
  stream: Ayat
  setStream: (stream: Ayat) => void
  isPaused: boolean
}

export function Timer ({ surah, stream, setStream, locale, isPaused }: Props) {
  const ayah = stream[stream.length - 1];
  const [ms, setMs] = useState(ayah.readTimeMs);
  useEffect(() => setMs(ayah.readTimeMs), [ayah.id]);
  useEffect(() => {
    if (isPaused) {
      return;
    } else if (ms <= 0) {
      setStream([...stream, surah.ayat[ayah.id.number]]);
    } else {
      setTimeout(() => setMs(ms - 100), 100);
    }
  }, [ms, isPaused]);
  return (
    <div className='timer'>
      {numberToDecimal(ms / 1000, locale)}
    </div>
  );
}

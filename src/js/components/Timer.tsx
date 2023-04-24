import React, { useEffect, useState } from 'react';
import * as Quran from 'lib/Quran';
import { formatNumber } from 'lib/i18n';

interface Props {
  surah: Quran.Surah
  locale: Quran.Locale
  stream: Quran.Ayat
  soundOn: boolean
  setStream: (stream: Quran.Ayat) => void
  isPaused: boolean
}

export function Timer ({ surah, stream, soundOn, setStream, locale, isPaused }: Props) {
  const ayah = stream[stream.length - 1];
  const [ms, setMs] = useState(ayah.readTimeMs);
  const [tid, setTid] = useState<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (tid) {
      clearTimeout(tid);
      setTid(undefined);
    }
    setMs(ayah.readTimeMs);
  }, [soundOn, ayah.id]);
  useEffect(() => {
    if (isPaused) {
      return;
    } else if (ms <= 0) {
      setStream([...stream, surah.ayat[ayah.id]]);
    } else {
      setTid(setTimeout(() => setMs(ms - 100), 100));
    }
  }, [ms, isPaused]);
  return (
    <div className='timer'>
      {formatNumber(ms / 1000, locale)}
    </div>
  );
}

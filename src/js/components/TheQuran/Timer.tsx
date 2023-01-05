import React, { useEffect, useState } from 'react';
import { Surah, Ayah, Ayat, Locale } from 'lib/Quran';
import { numberToDecimal } from 'lib/i18n';

interface Props {
  surah: Surah
  ayah: Ayah
  locale: Locale
  stream: Ayat
  setStream: (stream: Ayat) => void
}

export function Timer ({ surah, ayah, stream, setStream, locale }: Props) {
  const [ms, setMs] = useState(ayah.readTimeMs);
  useEffect(() => setMs(ayah.readTimeMs), [ayah.id]);
  useEffect(() => {
    if (stream.length === surah.ayat.length) {
      return;
    } else if (ms <= 0) {
      setStream([...stream, surah.ayat[ayah.id.number]]);
    } else {
      setTimeout(() => setMs(ms - 100), 100);
    }
  }, [ms]);
  return (
    <div className='timer'>
      {numberToDecimal(ms / 1000, locale)}
    </div>
  );
}

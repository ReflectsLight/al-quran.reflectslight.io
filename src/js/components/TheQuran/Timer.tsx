import React, { useEffect, useState } from 'react';
import { Surah, Ayah, Ayat } from 'lib/Quran';

interface TimerProps {
  surah: Surah
  ayah: Ayah
  stream: Ayat
  setStream: (stream: Ayat) => void
}

export function Timer ({ surah, ayah, stream, setStream }: TimerProps) {
  const [ms, setMs] = useState(ayah.readTimeMs);
  useEffect(() => setMs(ayah.readTimeMs), [ayah]);
  useEffect(() => {
    if (stream.length === surah.ayat.length) {
      return;
    } else if (ms <= 0) {
      setStream([...stream, surah.ayat[ayah.id]]);
    } else {
      setTimeout(() => setMs(ms - 100), 100);
    }
  }, [ms]);
  return (
    <div className='timer'>
      {(ms / 1000).toFixed(1)}
    </div>
  );
}

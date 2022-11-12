import { useState, useEffect } from 'react';
import { Quran } from 'lib/Quran';

export default function (locale: string, surahId: number) {
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    const path = `/${locale}/${surahId}/surah.json`;
    const text = document.querySelector<HTMLElement>(`script[src="${path}"]`).innerText;
    const json = JSON.parse(text);
    setSurah(Quran.Surah.fromJSON(json.shift(), json));
  }, []);

  return {
    surah,
    surahIsLoaded: surah !== null
  };
}

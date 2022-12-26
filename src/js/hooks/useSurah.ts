import { useState, useEffect } from 'react';
import { Quran, Locale } from 'lib/Quran';

export default function (locale: Locale, surahId: number) {
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    const path = `/${locale}/${surahId}/surah.json`;
    const text = document.querySelector<HTMLElement>(`script[src="${path}"]`).innerText;
    const json = JSON.parse(text);
    setSurah(Quran.Surah.fromJSON(locale, json.shift(), json));
  }, []);

  return {
    surah,
    surahIsLoaded: surah !== null
  };
}

import { useState, useEffect } from "react";
import { Quran } from "lib/Quran";

export default function(locale: string, surahId: number) {
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    (async () => {
      const res  = await fetch(`/json/${locale}/${surahId}.json`);
      const json = await res.json();
      setSurah(Quran.Surah.fromJSON(json.shift(), json));
    })();
  }, []);

  return {
    surah,
    surahIsLoaded: surah !== null,
  };
}

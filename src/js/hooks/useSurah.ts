import { useState, useEffect } from "react";
import { Quran } from "lib/Quran";

export default function(locale: string, surahByNumber: number) {
  const [loading, setLoading] = useState(true);
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    (async () => {
      const res  = await fetch(`/json/${locale}/${surahByNumber}.json`);
      const json = await res.json();
      setLoading(false);
      setSurah(Quran.Surah.fromJSON(json.shift(), json));
    })();
  }, []);

  return [loading, surah];
}

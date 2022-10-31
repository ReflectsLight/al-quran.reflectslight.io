import React from "react";
import { Surah } from "lib/Quran";

export function AboutSurah({surah}: {surah: Surah}) {
  return (
    <div className="about-surah">
      <span>
        {surah.translatedName}
      </span>
      <span>
        {surah.transliteratedName}
      </span>
    </div>
  );
}

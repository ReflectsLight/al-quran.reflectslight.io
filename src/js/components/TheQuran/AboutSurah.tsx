import React from 'react';
import { Surah } from 'lib/Quran';

interface Props {
  surah: Surah
  locale: string
}

export function AboutSurah (props: Props) {
  const { surah, locale } = props;
  return (
    <div className='about-surah'>
      <span lang={locale}>
        {locale === "ar" ? surah.name : surah.translatedName}
      </span>
      <span>
        {surah.transliteratedName}
      </span>
    </div>
  );
}

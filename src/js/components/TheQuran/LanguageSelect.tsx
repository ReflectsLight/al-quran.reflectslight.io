import React from 'react';
import { Select, SelectOption } from 'components/Select';
import { Surah, Ayah } from 'lib/Quran';

interface Props {
  locale: string
  surah: Surah
  stream: Ayah[]
  isPaused: boolean
}

export function LanguageSelect({ locale, surah, stream, isPaused }: Props) {
  const changeLanguage = (o: SelectOption) => {
    const locale = o.value;
    location.replace(
      `/${locale}/${surah.slug}/?ayah=${stream.length}&paused=${isPaused ? 't' : 'f'}`
    );
  };

  return (
    <Select value={locale} className="language" onChange={changeLanguage}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

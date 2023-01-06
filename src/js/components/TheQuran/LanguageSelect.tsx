import React from 'react';
import { Select, SelectOption } from 'components/Select';
import { Surah, Ayat } from 'lib/Quran';
import { Slice } from 'lib/Quran/Slice';

interface Props {
  locale: string
  surah: Surah
  stream: Ayah[]
  isPaused: boolean
  slice: Slice
}

export function LanguageSelect({ locale, surah, stream, isPaused, slice }: Props) {
  const changeLanguage = (o: SelectOption) => {
    const locale = o.value;
    const params = [
      ['ayah', slice.toParam() || stream.length],
      ['paused', isPaused ? 't' : null]
    ];
    const query = params.filter(([, v]) => v).flatMap(([k,v]) => `${k}=${v}`).join('&');
    location.replace(`/${locale}/${surah.slug}/?${query}`);
  };

  return (
    <Select value={locale} className="language" onChange={changeLanguage}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

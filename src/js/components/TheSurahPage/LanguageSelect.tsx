import React from 'react';
import { Select, SelectOption } from 'components/Select';
import * as Quran from 'lib/Quran';
import { Slice } from 'lib/Quran/Slice';

interface Props {
  locale: string
  onChange: (o: SelectOption) => void
}

export function LanguageSelect({ locale, onChange }: Props) {
  return (
    <Select value={locale} className="language" onChange={onChange}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

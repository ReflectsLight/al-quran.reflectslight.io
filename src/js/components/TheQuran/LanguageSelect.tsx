import React from "react";
import { Select, SelectOption } from "components/Select";
import { Surah, Ayah } from "lib/Quran";

interface Props {
  locale: string
  surah: Surah
  stream: Ayah[]
}

export function LanguageSelect(props: Props) {
  const { locale, surah, stream } = props;
  const changeLanguage = (o: SelectOption) => {
    const locale = o.value;
    location.replace(`/${locale}/${surah.slug}/?ayah=${stream.length}`);
  };

  return (
    <Select value={locale} className="language" onChange={changeLanguage}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

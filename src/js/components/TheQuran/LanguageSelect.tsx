import React from "react";
import { Select, SelectOption } from "components/Select";
import { Surah } from "lib/Quran";

interface Props {
  locale: string,
  surah: Surah
}

export function LanguageSelect(props: Props) {
  const { locale, surah } = props;
  const changeLanguage = (o: SelectOption) => {
    const locale = o.value;
    location.replace(`/${locale}/${surah.slug}/`);
  };

  return (
    <Select value={locale} className="language" onChange={changeLanguage}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

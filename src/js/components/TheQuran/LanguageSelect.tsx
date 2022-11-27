import React from "react";
import { Surah } from "lib/Quran";

interface Props {
  locale: string,
  surah: Surah
}

export function LanguageSelect(props: Props) {
  const { locale, surah } = props;
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    location.replace(`/${e.target.value}/${surah.slug}/`);
  };

  return (
    <select value={locale} onChange={changeLanguage}>
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </select>
  );
}

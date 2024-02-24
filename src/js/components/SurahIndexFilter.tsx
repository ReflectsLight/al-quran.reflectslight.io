import React from "react";
import { TFunction } from "lib/i18n";
import * as Quran from "lib/Quran";

type Props = {
  t: TFunction;
  locale: Quran.Locale;
  setIndex: (k: Quran.Surah[]) => void;
  surahs: Quran.Surah[];
};

export function SurahIndexFilter({ t, locale, setIndex, surahs }: Props) {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (value === "") {
      setIndex(surahs);
    } else {
      const regexp = new RegExp(value, "i");
      const newIndex = surahs.filter(
        surah =>
          regexp.test(surah.localizedName) || regexp.test(String(surah.id)),
      );
      setIndex(newIndex);
    }
  };

  return (
    <input
      className="surah-index-filter"
      type="text"
      placeholder={t(locale, "filter")}
      onChange={onInput}
    />
  );
}

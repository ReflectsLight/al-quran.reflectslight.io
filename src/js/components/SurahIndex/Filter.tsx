import React from "react";
import { TFunction } from "~/lib/t";
import type { TLocale, TSurah, Surah } from "Quran";

type Props = {
  t: TFunction;
  locale: TLocale;
  setIndex: (k: Surah<TSurah>[]) => void;
  surahs: Surah<TSurah>[];
};

export function Filter({ t, locale, setIndex, surahs }: Props) {
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
          regexp.test(surah.getName(locale)) || regexp.test(String(surah.id)),
      );
      setIndex(newIndex);
    }
  };

  return (
    <input
      className="p-3 h-4 surah-index-filter"
      type="text"
      placeholder={t(locale, "filter")}
      onChange={onInput}
    />
  );
}

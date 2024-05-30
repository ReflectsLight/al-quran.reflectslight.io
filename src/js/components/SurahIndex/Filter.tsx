import React from "react";
import { TFunction } from "~/lib/t";
import type { Surah, TLocale } from "Quran";

type Props = {
  locale: TLocale;
  t: TFunction;
  setIndex: (k: Surah[]) => void;
  surahs: Surah[];
};

export function Filter({ locale, t, setIndex, surahs }: Props) {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (value === "") {
      setIndex(surahs);
    } else {
      const regexp = new RegExp(value, "i");
      const newIndex = surahs.filter(
        surah => regexp.test(surah.name) || regexp.test(String(surah.id)),
      );
      setIndex(newIndex);
    }
  };

  return (
    <input
      className="p-3 h-2 text-base color-primary rounded outline-0 surah-index-filter"
      type="text"
      placeholder={t(locale, "filter")}
      onChange={onInput}
    />
  );
}

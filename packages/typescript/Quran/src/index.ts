/**
 * Types
 */
type TAyat = Ayah[];

type TLocale = {
  readonly name: string,
  readonly displayName: string,
  readonly direction: "rtl" | "ltr"
};

type TQuran = {
  readonly locale: TLocale;
  readonly surahs: Surah[];
}

type TSurah = {
  readonly id: number;
  readonly name: string;
  readonly urlName: string;
  readonly translitName: string;
  readonly numberOfAyah: number;
  readonly translatedBy: string | null;
  readonly durations?: [number, number][];
  readonly ayat?: [number, string][];
};

type TAyah = {
  readonly id: number;
  readonly body: string;
}

/**
 * Classes
 */
class Quran {
  readonly locale: TLocale;
  readonly surahs: Surah[];

  /**
   * @returns {Array} The available locales
   */
  static get locales(): TLocale[] {
    return [
      {"name": "en", "displayName": "English", "direction": "ltr"},
      {"name": "ar", "displayName": "العربية", "direction": "rtl"},
      {"name": "fa", "displayName": "فارسی", "direction": "rtl"}
    ];
  }

  constructor(self: TQuran) {
    this.locale = self.locale;
    this.surahs = self.surahs;
  }
}

class Surah {
  readonly id: number;
  readonly name: string;
  readonly urlName: string;
  readonly translitName: string;
  readonly numberOfAyah: number;
  readonly translatedBy: string | null;
  readonly ayat: Ayah[];

  constructor(self: TSurah) {
    this.id = self.id;
    this.name = self.name;
    this.urlName = self.urlName;
    this.translitName = self.translitName;
    this.numberOfAyah = self.numberOfAyah;
    this.translatedBy = self.translatedBy;
    this.ayat = (self.ayat || []).map((ayah,i) => (
      {
        ...new Ayah({id: ayah[0], body: ayah[1]}),
        ms: self.durations ? self.durations[i][1] * 1000 : 0
      }
    ));
    return this;
  }
}

class Ayah {
  readonly id: number;
  readonly body: string;
  ms: number;

  constructor(self: TAyah) {
    this.id = self.id;
    this.body = self.body;
    this.ms = 0;
  }
}

/**
 * Exports
 */
export {
  Quran, Surah, Ayah,
  TQuran, TSurah, TAyah,
  TAyat, TLocale
};

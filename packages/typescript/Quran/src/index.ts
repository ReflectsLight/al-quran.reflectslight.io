/**
 * Types
 */
type TLocale = "ar" | "en";
type TAyat = Ayah[];

type TQuran = {
  readonly locale: TLocale;
  readonly surahs: Surah[];
}

type TSurah = {
  readonly id: number;
  readonly name: string;
  readonly numberOfAyah: number;
  readonly roman: { name: string; slug: string };
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
    return ["ar", "en"];
  }

  constructor(self: TQuran) {
    this.locale = self.locale;
    this.surahs = self.surahs;
  }
}

class Surah {
  readonly id: number;
  readonly name: string;
  readonly numberOfAyah: number;
  readonly roman: {name: string, slug: string};
  readonly ayat: TAyat

  constructor(self: TSurah) {
    this.id = self.id;
    this.name = self.name;
    this.numberOfAyah = self.numberOfAyah;
    this.roman = self.roman;
    this.ayat = [];
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

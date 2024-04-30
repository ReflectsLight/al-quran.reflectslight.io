type TLocale = "ar" | "en";
type TAyat = Ayah<TAyah>[];
type TQuran = {
  locale: TLocale;
  surahs: Surah<TSurah>[];
}
type TSurah = {
  readonly id: number;
  readonly name: string;
  readonly numberOfAyah: number;
  readonly romanized: { name: string; slug: string };
  readonly utf8: { codepoints: number[] };
};
type TAyah = {
  id: number;
  body: string;
}

class Quran<T extends TQuran> {
  locale: TLocale;
  surahs: Surah<TSurah>[];

  constructor(self: T) {
    this.locale = self.locale;
    this.surahs = self.surahs;
  }
}

class Surah<T extends TSurah> {
  readonly id: number;
  readonly name: string;
  readonly numberOfAyah: number;
  readonly romanized: { name: string; slug: string };
  readonly utf8: { codepoints: number[] };
  readonly ayat: TAyat

  constructor(self: T) {
    this.id = self.id;
    this.name = self.name;
    this.numberOfAyah = self.numberOfAyah;
    this.romanized = self.romanized;
    this.utf8 = self.utf8;
    this.ayat = [];
    return this;
  }

  getName(locale: TLocale): string {
    if (locale === "ar") {
      return String.fromCodePoint(...this.utf8.codepoints);
    } else {
      return this.name;
    }
  }
}

class Ayah<T extends TAyah> {
  readonly id: number;
  readonly body: string;
  ms: number;

  constructor(self: T) {
    this.id = self.id;
    this.body = self.body;
    this.ms = 0;
  }
}

export {
  Quran, Surah, Ayah,
  TQuran, TSurah, TAyah,
  TAyat, TLocale
};

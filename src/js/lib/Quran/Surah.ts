import * as Quran from 'lib/Quran';

export class Surah {
  locale: Quran.Locale;
  ayat: Quran.Ayat;
  #surah: Quran.JSON.Surah;

  static fromDOMNode(locale: Quran.Locale, node: HTMLScriptElement) {
    const json = JSON.parse(node.innerText);
    return Surah.fromJSON(locale, json.shift(), json);
  }

  static fromJSON(locale: Quran.Locale, surah: Quran.JSON.Surah, ayat: Quran.JSON.Ayat = []) {
    return new Surah(locale, surah, this.mapFromJSON(locale, ayat));
  }

  static mapFromJSON(locale: Quran.Locale, ayat: Quran.JSON.Ayat) {
    return ayat.map((ayah) => Quran.Ayah.fromJSON(locale, ayah));
  }

  constructor(locale: Quran.Locale, surah: Quran.JSON.Surah, ayat: Quran.Ayat) {
    this.locale = locale;
    this.ayat = ayat;
    this.#surah = surah;
  }

  get id(): number {
    return Number(this.#surah.id);
  }

  get name() {
    return String.fromCodePoint(...this.#surah.codepoints);
  }

  get transliteratedName() {
    return this.#surah.transliterated_name;
  }

  get localizedName() {
    if (this.locale === 'ar') {
      return this.name;
    } else {
      return this.#surah.translated_name;
    }
  }

  get placeOfRevelation() {
    return this.#surah.place_of_revelation;
  }

  get numberOfAyah() {
    return this.#surah.ayahs;
  }

  get slug() {
    return this.#surah.slug;
  }
}

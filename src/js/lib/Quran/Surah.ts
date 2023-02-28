import * as Quran from 'lib/Quran';
import { DelayBaseLine, DelayPerWord } from 'lib/i18n';

export interface IDObject {
  number: number
  localeKey: string[]
}

export class Surah {
  #surah: Quran.JSON.Surah;
  ayat: Quran.Ayat;

  static fromDOMNode(locale: Quran.Locale, node: HTMLScriptElement) {
    const json = JSON.parse(node.innerText);
    return Surah.fromJSON(locale, json.shift(), json);
  }

  static fromJSON(locale: Quran.Locale, surah: Quran.JSON.Surah, ayat: Quran.JSON.Ayat) {
    return new Surah(
      surah,
      ayat.map(([id, text]) => {
        return {
          id: { number: id, localeKey: String(id).split('') },
          text,
          readTimeMs: DelayBaseLine + (text.split(' ').length * DelayPerWord[locale]),
        };
      }),
    );
  }

  constructor(surah: Quran.JSON.Surah, ayat: Quran.Ayat) {
    this.#surah = surah;
    this.ayat = ayat;
  }

  get id(): IDObject {
    return {
      number: Number(this.#surah.id),
      localeKey: this.#surah.id.split('')
    };
  }

  get name() {
    return String.fromCodePoint(...this.#surah.codepoints);
  }

  get transliteratedName() {
    return this.#surah.transliterated_name;
  }

  get translatedName() {
    return this.#surah.translated_name;
  }

  get placeOfRevelation() {
    return this.#surah.place_of_revelation;
  }

  get numberOfAyah() {
    return this.#surah.verse_count;
  }

  get slug() {
    return this.#surah.slug;
  }
}

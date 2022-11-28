import { Locale } from "lib/Quran";
import { DelayBaseLine, DelayPerWord } from "lib/i18n";

export type Ayat = Ayah[];

interface SurahDetails {
  id: string;
  place_of_revelation: string;
  transliterated_name: string;
  translated_name: string;
  verse_count: number;
  slug: string;
  codepoints: number[];
}

export interface Ayah {
  id: IDObject,
  text: string;
  readTimeMs: number;
}

interface IDObject {
  number: number,
  localeKey: string[]
}

export class Surah {
  #details: SurahDetails;
  ayat: Ayat;

  static fromDOMNode(locale: Locale, node: HTMLScriptElement) {
    const json = JSON.parse(node.innerText);
    return Surah.fromJSON(locale, json.shift(), json);
  }

  static fromJSON(locale: Locale, details: SurahDetails, ayat: Array<[number, string]>): Surah {
    return new Surah(
      details,
      ayat.map(([id, text]) => {
        return {
          id: { number: id, localeKey: String(id).split("") },
          text,
          readTimeMs: DelayBaseLine + (text.split(" ").length * DelayPerWord[locale]),
        };
      }),
    );
  }

  constructor(details: SurahDetails, ayat: Ayat) {
    this.#details = details;
    this.ayat = ayat;
  }

  get id(): IDObject {
    return {
      number: Number(this.#details.id),
      localeKey: this.#details.id.split("")
    };
  }

  get name() {
    return String.fromCodePoint(...this.#details.codepoints);
  }

  get transliteratedName() {
    return this.#details.transliterated_name;
  }

  get translatedName() {
    return this.#details.translated_name;
  }

  get placeOfRevelation() {
    return this.#details.place_of_revelation;
  }

  get numberOfAyah() {
    return this.#details.verse_count;
  }

  get slug() {
    return this.#details.slug;
  }
}

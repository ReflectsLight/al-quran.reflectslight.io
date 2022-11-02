interface SurahDetails {
  id: string
  place_of_revelation: string
  transliterated_name: string
  translated_name: string
  verse_count: number
  slug: string
  codepoints: number[]
}
export interface Ayah {id: number, text: string, readTimeMs: number}
export type Ayat = Ayah[];

export class Surah {
  #details: SurahDetails;
  ayat: Ayat;

  static fromJSON (details: SurahDetails, ayat: Array<[number, string]>): Surah {
    return new Surah(
      details,
      ayat.map(([id, text]) => {
        return {
          id,
          text,
          readTimeMs: text.split(' ').length * 500
        };
      })
    );
  }

  constructor (details: SurahDetails, ayat: Ayat) {
    this.#details = details;
    this.ayat = ayat;
  }

  get id () {
    return this.#details.id;
  }

  get name () {
    return String.fromCodePoint(...this.#details.codepoints);
  }

  get transliteratedName () {
    return this.#details.transliterated_name;
  }

  get translatedName () {
    return this.#details.translated_name;
  }

  get placeOfRevelation () {
    return this.#details.place_of_revelation;
  }

  get numberOfAyah () {
    return this.#details.verse_count;
  }
}

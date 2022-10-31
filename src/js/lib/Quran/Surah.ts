type SurahInfo = {
  id: string,
  place_of_revelation: string,
  transliterated_name: string,
  translated_name: string,
  verse_count: number,
  slug: string,
  codepoints: Array<number>
}
export type Ayah = {id: number, text: string, readingTime: number};
export type Ayat = Array<Ayah>;

export class Surah {
  #details: SurahInfo;
  ayat: Ayat;

  static fromJSON(details: SurahInfo, ayat: Array<[number, string]>): Surah {
    return new Surah(
      details,
      ayat.map(([id, text]) => {
        return {
          id, text,
          readingTime: text.split(" ").length * 500,
        }
      })
    );
  }

  constructor(details: SurahInfo, ayat: Ayat) {
    this.#details = details;
    this.ayat = ayat;
  }

  getInfo() {
    return {
      id: this.#details.id,
      placeOfRevelation: this.#details.place_of_revelation,
      transliteratedName: this.#details.transliterated_name,
      translatedName: this.#details.translated_name,
      ayahCount: this.#details.verse_count,
      arabicCodePoints: this.#details.codepoints
    }
  }
}

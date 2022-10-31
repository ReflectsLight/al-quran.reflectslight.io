type SurahDetails = {
  id: string,
  place_of_revelation: string,
  transliterated_name: string,
  translated_name: string,
  verse_count: number,
  slug: string,
  codepoints: Array<number>
}
export type Ayah = {num: number, text: string, readingTime: number};
export type Ayat = Array<Ayah>;

export class Surah {
  #details: SurahDetails;
  ayat: Ayat;

  static fromJSON(details: SurahDetails, ayat: Array<[number, string]>): Surah {
    return new Surah(
      details,
      ayat.map(([num, text]) => {
        return {
          num, text,
          readingTime: text.split(" ").length * 500,
        }
      })
    );
  }

  constructor(details: SurahDetails, ayat: Ayat) {
    this.#details = details;
    this.ayat = ayat;
  }

  getDetails() {
    const {
      id,
      place_of_revelation: placeOfRevelation,
      transliterated_name: transliteratedName,
      translated_name: translatedName,
      verse_count: ayahCount,
      codepoints: arabicCodePoints
    } = this.#details;
  }
}

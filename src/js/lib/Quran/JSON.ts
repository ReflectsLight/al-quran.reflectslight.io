interface Surah {
  id: string
  place_of_revelation: string
  transliterated_name: string
  translated_name: string
  verse_count: number
  slug: string
  codepoints: number[]
}
type Ayah = [number, string];
type Ayat = Ayah[];
export { Surah, Ayah, Ayat };

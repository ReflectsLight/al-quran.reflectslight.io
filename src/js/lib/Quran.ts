import * as JSON from "lib/Quran/JSON";
import { Surah, IDObject } from "lib/Quran/Surah";

type Locale = 'ar' | 'en';
type Ayah = {id: IDObject, text: string, readTimeMs: number };
type Ayat = Ayah[];

export { Surah, Ayah, Ayat, Locale, JSON };

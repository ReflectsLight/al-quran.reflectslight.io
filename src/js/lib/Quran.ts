import * as JSON from "lib/Quran/JSON";
import { Ayah } from "lib/Quran/Ayah";
import { Surah } from "lib/Quran/Surah";

type Locale = "ar" | "en";
type Ayat = Ayah[];
type Reciter = { id: string; name: string; nationality: string; url: string };

export { Surah, Ayah, Ayat, Reciter, Locale, JSON };

import * as JSON from "lib/Quran/JSON";
import { Ayah } from "lib/Quran/Ayah";
import { Surah } from "lib/Quran/Surah";

type Locale = "ar" | "en";
type Ayat = Ayah[];
type Recitation = {
  id: string;
  author: {
    name: string;
    nationality: string;
  };
  url: {
    protocol: string;
    hostname: string;
    pathname: string;
  };
};

export { Surah, Ayah, Ayat, Recitation, Locale, JSON };

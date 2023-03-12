import * as JSON from 'lib/Quran/JSON';
import { Ayah } from 'lib/Quran/Ayah';
import { Surah } from 'lib/Quran/Surah';

type Locale = 'ar' | 'en';
type Ayat = Ayah[];

export { Surah, Ayah, Ayat, Locale, JSON };

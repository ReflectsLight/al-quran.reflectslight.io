import * as JSON from 'lib/Quran/JSON';
import { Surah } from 'lib/Quran/Surah';

type Locale = 'ar' | 'en';
interface Ayah {id: number, text: string, readTimeMs: number }
type Ayat = Ayah[];

export { Surah, Ayah, Ayat, Locale, JSON };

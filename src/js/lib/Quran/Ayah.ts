import * as Quran from 'lib/Quran';
import { DelayBaseLine, DelayPerWord } from 'lib/i18n';

export type Ayah = {
  id: number
  text: string
  readTimeMs: number
};

export function Ayah(ayah: Ayah): Ayah {
  const self = Object.create(null);
  self.id = ayah.id;
  self.text = ayah.text;
  self.readTimeMs = ayah.readTimeMs;
  return self;
}

Ayah.fromJSON = (locale: Quran.Locale, ayah: Quran.JSON.Ayah): Ayah => {
  const [ id, text ] = ayah;
  const readTimeMs = DelayBaseLine + (text.split(' ').length * DelayPerWord[locale]);
  return Ayah({ id: Number(id), text, readTimeMs });
};

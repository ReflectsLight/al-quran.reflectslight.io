import * as Quran from "lib/Quran";

export type Ayah = {
  id: number;
  text: string;
  readTimeMs: number;
};

export function Ayah(ayah: Quran.JSON.Ayah): Ayah {
  const self = Object.create(null);
  self.id = ayah[0];
  self.text = ayah[1];
  self.readTimeMs = 0;
  return self;
}

Ayah.fromJSON = (ayah: Quran.JSON.Ayah): Ayah => {
  return Ayah(ayah);
};

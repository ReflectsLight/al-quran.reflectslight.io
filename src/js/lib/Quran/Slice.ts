export interface Slice {
  begin: number
  end: number
  length: number
  coversOneAyah: boolean
  coversOneSurah: boolean
  coversSubsetOfSurah: boolean
  toParam: () => string | null
}

export function Slice(begin: number, end: number): Slice {
  const self: Slice = Object.create(null);

  self.begin = begin;
  self.end = end;
  self.coversOneAyah = begin === end;
  self.coversOneSurah = begin === 1 && end === 286;
  self.coversSubsetOfSurah = begin >= 1 && end < 286;
  self.length = end - (begin - 1);

  self.toParam = () => {
    if (self.coversOneAyah) {
      return `${self.begin}`;
    } else if(self.coversSubsetOfSurah) {
      return `${self.begin}..${self.end}`;
    } else {
      return null;
    }
  };

  return self;
}

const digitsRange = /^(\d{1,3})\.\.(\d{1,3})$/;
const digits = /^\d{1,3}$/;
Slice.fromParam = function(param: string | null): Slice {
  if (!param) {
    return Slice(1, 286);
  }
  const match = param.match(digitsRange);
  if (match) {
    const [, begin, end] = match;
    return Slice(parseInt(begin), parseInt(end));
  } else if (digits.test(param)) {
    return Slice(parseInt(param), parseInt(param));
  } else {
    return Slice(1, 286);
  }
};

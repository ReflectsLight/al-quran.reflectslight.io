export interface Slice {
  begin: number;
  end: number | null;
  coversOneAyah: boolean;
  coversOneSurah: boolean;
  coversSubsetOfSurah: boolean;
  subsetLength: number;
  toParam: () => string | null;
}

export function Slice(begin: number, end: number | null): Slice {
  const self: Slice = Object.create(null);

  self.begin = begin;
  self.end = end;
  self.coversOneAyah = end === null;
  self.coversOneSurah = begin === 1 && end === 286;
  self.coversSubsetOfSurah = end !== null && begin >= 1 && end < 286;
  self.subsetLength = getSubsetLength(self);

  return self;
}

const getSubsetLength = (slice: Slice) => {
  const { begin, end } = slice;
  if (end) {
    return end - (begin - 1);
  } else {
    return 0;
  }
};

const digitsRange = /^(\d{1,3})\.\.(\d{1,3})$/;
const digits = /^\d{1,3}$/;
Slice.fromParam = function (param: string | null): Slice {
  if (!param) {
    return Slice(1, 286);
  }
  const match = param.match(digitsRange);
  if (match) {
    const [, begin, end] = match;
    return Slice(parseInt(begin), parseInt(end));
  } else if (digits.test(param)) {
    return Slice(parseInt(param), null);
  } else {
    return Slice(1, 286);
  }
};

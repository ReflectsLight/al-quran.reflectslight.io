import type { Item, FontItem } from './postman/item';
import item from './postman/item';
import request from './postman/request';

type Packet = { fetch: () => Promise<Package> };
type Items = Array<Item | FontItem>;
type Package = {
  fonts: FontFace[]
  images: HTMLElement[]
  css: HTMLElement[]
  scripts: HTMLElement[]
  json: HTMLElement[]
};

export default function (...args: Array<Item | FontItem | Function>) {
  const self: Packet = Object.create(null);
  const result: Package = { fonts: [], images: [], css: [], scripts: [], json: [] };

  /* This chunk of code separates "args" into */
  /* an items array, and a callback function. */
  const items: Items = [];
  let callback: Function | null = null;
  args.forEach((item) => {
    if (typeof item === 'function') {
      callback = item;
    } else {
      items.push(item);
    }
  });
  items.sort((i1, i2) => i1.priority >= i2.priority ? 1 : -1);

  /* This chunk of code dispatches the callback */
  /* function assigned above (might be null). */
  let index = 0;
  const onProgress = <T>(el: T) => {
    if (callback) {
      index++;
      if (index <= items.length) {
        callback(100 * (index / items.length));
      }
    }
    return el;
  };

  const spawnRequests = () => {
    const reqs = items.map((item: Item | FontItem) => {
      if ('fontFamily' in item) {
        const req = request.font;
        return req(item)
          .then((el) => onProgress<FontFace>(el))
          .then((font) => result.fonts.push(font))
          .then(() => result);
      } else if(item.requestId !== 'font' && item.group !== 'fonts') {
        const req = request[item.requestId];
        const ary = result[item.group];
        return req(item)
          .then((el) => onProgress<HTMLElement>(el))
          .then((el) => ary.push(el))
          .then(() => result);
      }
      /* unreachable */
      return null;
    });
    return reqs as Array<Promise<Package>>;
  };

  self.fetch = async () => {
    await Promise.all<Package>(spawnRequests());
    return result;
  };

  return self;
}

export { item };

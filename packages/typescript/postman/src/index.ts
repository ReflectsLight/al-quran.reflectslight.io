import type { Item, FontItem } from './postman/item';
import item from './postman/item';
import request from './postman/request';

type Postman = { fetch: () => Promise<Package> };
type Args = Array<Item | FontItem | Function>
type Items = Array<Item | FontItem>;
type Package = {
  fonts: FontFace[]
  images: HTMLElement[]
  css: HTMLElement[]
  scripts: HTMLElement[]
  json: HTMLElement[]
};

function parseArgs(args: Args): [Items, Function] {
  const items: Items = [];
  let callback: Function = (n: number) => n
  args.forEach((item) => {
    if (typeof item === 'function') {
      callback = item;
    } else {
      items.push(item);
    }
  });
  return [items, callback];
}

export { item };

export default function (...args: Args) {
  const self: Postman = Object.create(null);
  const result: Package = { fonts: [], images: [], css: [], scripts: [], json: [] };
  const [items, callback] = parseArgs(args);
  items.sort((i1, i2) => i1.priority >= i2.priority ? 1 : -1);

  let index = 0;
  const onProgress = <T>(el: T) => {
    index++;
    if (index <= items.length) {
      callback(100 * (index / items.length));
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

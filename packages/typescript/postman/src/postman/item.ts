type Group = 'fonts' | 'images' | 'css' | 'scripts' | 'json';
type RequestID = 'font' | 'image' | 'css' | 'script' | 'json';

export type Item = {
  priority: number
  group: Group
  requestId: RequestID
  href: string
  props?: Partial<HTMLElement>
};

export type FontItem = {
  fontFamily: string
} & Item;

export default {
  font(fontFamily: string, href: string): FontItem {
    return {
      priority: 1,
      group: 'fonts',
      requestId: 'font',
      href, fontFamily,
    };
  },

  image(href: string, props?: Partial<HTMLElement>): Item {
    return {
      priority: 2,
      group: 'images',
      requestId: 'image',
      href, props
    };
  },

  css(href: string, props?: Partial<HTMLElement>): Item {
    return {
      priority: 3,
      group: 'css',
      requestId: 'css',
      href, props
    };
  },

  script(href: string, props?: Partial<HTMLElement>): Item {
    return {
      priority: 4,
      group: 'scripts',
      requestId: 'script',
      href, props
    };
  },

  json(href: string, props?: Partial<HTMLElement>): Item {
    return {
      priority: 5,
      group: 'json',
      requestId: 'json',
      href, props
    }
  },

  progress(fn: (percent: number) => void): (percent: number) => void {
    return fn;
  }
};

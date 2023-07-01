import type { Item, FontItem } from './item';

const fetchOptions = (): RequestInit => {
  const getNavigationEntries = (): PerformanceNavigationTiming[] =>  {
    return performance
           .getEntriesByType('navigation') as PerformanceNavigationTiming[];
  };
  const pageHasRefreshed = getNavigationEntries()
                           .some((e) => e.type === 'reload');
  return pageHasRefreshed ? { cache: 'reload' } : {};
};

export default {
  font(item: FontItem): Promise<FontFace>  {
    const { fontFamily, href } = item;
    return new FontFace(fontFamily, href).load();
  },

  script(item: Item): Promise<HTMLElement> {
    const { href } = item;
    return fetch(href, fetchOptions())
      .then((res) => res.text())
      .then((text) => ({ type: 'application/javascript', text }))
      .then((props) => Object.assign(document.createElement('script'), props));
  },

  css(item: Item): Promise<HTMLElement> {
    const { href } = item;
    return fetch(href, fetchOptions())
      .then((res) => res.text())
      .then((text) => ({ innerText: text }))
      .then((props) => Object.assign(document.createElement('style'), props));
  },

  image(item: Item): Promise<HTMLElement> {
    const { href } = item;
    return new Promise<HTMLElement>((resolve, reject) => {
      const el = document.createElement('img');
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = href;
    });
  },

  json(item: Item): Promise<HTMLElement> {
    const { href } = item;
    return fetch(href, fetchOptions())
      .then((res) => res.text())
      .then((text) => ({type: 'application/json', text}))
      .then((props) => Object.assign(props, item.props || {}))
      .then((props) => Object.assign(document.createElement('script'), props));
  }
};

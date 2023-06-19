const fetchOptions = (): RequestInit => {
  const getNavigationEntries = (): PerformanceNavigationTiming[] =>  {
    return performance
           .getEntriesByType('navigation') as PerformanceNavigationTiming[];
  };
  const pageHasRefreshed = getNavigationEntries()
                           .some((e) => e.type === 'reload');
  return pageHasRefreshed ? { cache: 'reload' } : {};
}

export function script(
  scripts: string[] | undefined,
  reporter: <T>(f: T) => T
) {
  return Promise.all(
    (scripts || []).map((src) => {
      return fetch(src, fetchOptions())
            .then((res) => res.text())
            .then((text) => Object.assign(document.createElement('script'), { type: 'application/javascript', text }))
            .then((el) => reporter<HTMLElement>(el));
    })
  );
}

export function stylesheet(
  stylesheets: string[] | undefined,
  reporter: <T>(f: T) => T
) {
  return Promise.all(
    (stylesheets || []).map((href) => {
      return fetch(href, fetchOptions())
            .then((res) => res.text())
            .then((innerText) => Object.assign(document.createElement('style'), { innerText }))
            .then((el) => reporter<HTMLElement>(el));
    })
  );
}

export function image(
  images: string[] | undefined,
  reporter: <T>(f: T) => T
) {
  return Promise.all(
    (images || []).map((src) => {
      return new Promise<HTMLElement>((resolve, reject) => {
        const el = document.createElement('img');
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = src;
      }).then((el) => reporter<HTMLElement>(el));
    })
  );
}

export function font(
  fonts: Array<[string, string]> | undefined,
  reporter: <T>(f: T) => T
) {
  return Promise.all(
    (fonts || []).map(async (font) => {
      return await new FontFace(...font)
                      .load()
                      .then((font) => reporter<FontFace>(font));
    })
  );
}

export function other(
  others: string[] | undefined,
  reporter: <T>(f: T) => T
) {
  return Promise.all(
    (others || []).map((src) => {
      return fetch(src, fetchOptions())
            .then((res) => res.text())
            .then((text) => Object.assign(document.createElement('script'), { type: 'text/plain', src, text }))
            .then((el) => reporter<HTMLElement>(el));
    })
  );
}

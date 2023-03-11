import { fetchOptions } from './fetchOptions';

export default function(
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

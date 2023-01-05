import { ReporterFunction } from './types';
import { fetchOptions } from './fetchOptions';

export default function(
  others: string[] | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (others || []).map((src) => {
      return fetch(src, fetchOptions())
            .then((res) => res.text())
            .then((text) => Object.assign(document.createElement('script'), {type: 'text/plain', src, text}))
            .then((el) => reporter(el));
    })
  );
}

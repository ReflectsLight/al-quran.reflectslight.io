import { ReporterFunction } from './types';

export default function(
  images: string[] | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (images || []).map((src) => {
      return new Promise<HTMLElement>((resolve, reject) => {
        const el = document.createElement('img');
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = src;
      }).then((el) => reporter(el));
    })
  );
}

export default function(
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

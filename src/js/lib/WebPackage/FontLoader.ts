import { ReporterFunction } from './types';

export default function(
  fonts: Array<[string, string]> | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (fonts || []).map((font) => {
      return new FontFace(...font).load().then((font) => reporter(font));
    })
  );
}

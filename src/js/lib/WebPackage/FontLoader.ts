export default function(
  fonts: Array<[string, string]> | undefined,
  reporter: <T>(f: T) => T
) {

  return Promise.all(
    (fonts || []).map(async (font) => {
      return new FontFace(...font).load().then((font) => reporter<FontFace>(font));
    })
  );
}

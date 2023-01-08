export interface Locale {
  fromBrowser: () => string
  fromPath: () => string | undefined
}

export function Locale(window: Window): Locale {
  const self = Object.create(null);
  const { navigator, location } = window;
  const locales = ['ar', 'en'];

  self.fromBrowser = () => {
    return navigator
      .languages
      .map((lang) => lang.substr(0, 2))
      .find((locale) => locales.includes(locale)) || 'en';
  };

  self.fromPath = () => {
    return location
      .pathname
      .split('/')
      .filter((s) => s.length)
      .at(0);
  };

  return self;
}

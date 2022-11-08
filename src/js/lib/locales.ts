export const locales = ['ar', 'en'];

export function getLocale (): string {
  const userAgentLocales = navigator.languages.map((lang) => lang.substr(0, 2));
  return userAgentLocales.find((locale) => locales.includes(locale)) || 'en';
}

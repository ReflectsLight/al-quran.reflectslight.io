import React from 'react';
import { set as setCookie } from 'es-cookie';

interface Props {
  setTheme: (theme: string) => void
  theme: string
}

export function ThemeSelect ({ setTheme, theme }: Props) {
  const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCookie('theme', e.target.value, { domain: location.host, expires: 365 });
    setTheme(e.target.value);
  };

  return (
    <select name='theme' value={theme} onChange={onThemeChange}>
      <option value='moon'>The Moon</option>
      <option value='leaf'>The Leaf</option>
    </select>
  );
}

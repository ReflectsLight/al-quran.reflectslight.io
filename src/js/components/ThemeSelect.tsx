import React from 'react';
import { Select, SelectOption } from '@/components/Select';
import { set as setCookie } from 'es-cookie';

interface Props {
  setTheme: (theme: string) => void
  theme: string
}

export function ThemeSelect ({ setTheme, theme }: Props) {
  const onThemeChange = (o: SelectOption) => {
    setCookie('theme', o.value, { domain: location.host, expires: 365 });
    setTheme(o.value);
  };

  return (
    <Select value={theme} onChange={onThemeChange}>
      <option value='moon'>🌛</option>
      <option value='leaf'>🌿</option>
    </Select>
  );
}

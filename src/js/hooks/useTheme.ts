import { useState } from "react";
import { get as getCookie, set as setCookie } from "es-cookie";

type Theme = "blue" | "green";
const THEMES: Theme[] = ["blue", "green"];
const DEFAULT_THEME = "blue";

export function useTheme(): [Theme, (t: string) => void] {
  const cookie = getCookie("theme");
  const [theme, setTheme] = useState<Theme>(
    () => THEMES.find(t => t === cookie) || DEFAULT_THEME,
  );

  function _setTheme(newTheme: string) {
    const matchedTheme = THEMES.find((theme: Theme) => newTheme === theme);
    if (matchedTheme) {
      setCookie("theme", matchedTheme, { domain: location.host, expires: 365 });
      setTheme(matchedTheme);
    }
  }

  return [theme, _setTheme];
}

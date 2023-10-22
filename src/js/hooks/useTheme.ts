import { useEffect, useState } from "react";
import { get as getCookie, set as setCookie } from "es-cookie";

type Theme = "blue" | "green";
const THEMES: Theme[] = ["blue", "green"];
const DEFAULT_THEME = "blue";

export function useTheme(): [Theme, (t: string) => void] {
  const [theme, setTheme] = useState<Theme | null>(null);
  const cookie = getCookie("theme");

  useEffect(() => {
    const _theme = THEMES.find((theme: Theme) => cookie === theme);
    setTheme(_theme || DEFAULT_THEME);
  }, []);

  function _setTheme(newTheme: string) {
    const matchedTheme = THEMES.find((theme: Theme) => newTheme === theme);
    if (matchedTheme) {
      setCookie("theme", matchedTheme, { domain: location.host, expires: 365 });
      setTheme(matchedTheme);
    }
  }

  return [theme, _setTheme];
}

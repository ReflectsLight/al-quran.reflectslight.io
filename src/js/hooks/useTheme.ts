export type Theme = "blue" | "green" | "cyan"
type Result = [Theme, (t: Theme) => void]

export const THEMES: Theme[] = ["blue", "green", "cyan"]
export const DEFAULT_THEME = "blue"

export function useTheme(): Result {
  const cookies = Object.fromEntries(document.cookie.split(/;\s*/).map((e) => e.split("=")))
  const [theme, setTheme] = useState<Theme>(THEMES.find((t) => t === cookies.theme) || DEFAULT_THEME)
  const set = (t: Theme) => {
    if (THEMES.includes(t)) {
      const maxAge = 3600 * 24 * 90
      document.cookie = `theme=${t}; path=/; max-age=${maxAge}; SameSite=Strict`
      setTheme(t)
    }
  }

  useEffect(() => {
    if (!THEMES.includes(theme)) {
      setTheme(DEFAULT_THEME)
    }
  }, [])

  return [theme, set]
}

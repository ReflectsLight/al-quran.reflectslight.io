import { Select } from "~/components/Select"
import type { Theme } from "~/hooks/useTheme"
import type { TLocale } from "Quran"

type Props = {
  locale: TLocale
  theme: string
  setTheme: (theme: Theme) => void
}

export function ThemeSelect({ locale, theme, setTheme }: Props) {
  const themes: Theme[] = ["blue", "green", "cyan"]
  const isRTL = locale.direction === "rtl"
  const isLTR = locale.direction === "ltr"
  return (
    <Select value={theme} className="theme-select">
      {themes.map((t, i) => {
        return (
          <Select.Option
            key={i}
            onClick={() => setTheme(t)}
            className={classNames("flex w-10 h-6 mb-1", {
              "justify-start": isRTL,
              "justify-end": isLTR,
            })}
            value={t}
          >
            <span className={classNames("rounded w-5 h-5", t)} />
          </Select.Option>
        )
      })}
    </Select>
  )
}

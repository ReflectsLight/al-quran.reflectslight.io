import type { TLocale } from "Quran"

import { Select } from "~/components/Select"
import { useSettingsContext } from "~/contexts/SettingsContext"
import { THEMES } from "~/hooks/useTheme"

type Props = {
  locale: TLocale
}

export function ThemeSelect({ locale }: Props) {
  const { theme, setTheme } = useSettingsContext()
  const isRTL = locale.direction === "rtl"
  const isLTR = locale.direction === "ltr"
  return (
    <Select value={theme} className="theme-select w-full flex justify-end">
      {THEMES.map((t, i) => {
        return (
          <Select.Option
            key={i}
            onClick={() => setTheme(t)}
            className={classNames("flex h-6 mb-1", {
              "justify-start": isRTL,
              "justify-end": isLTR,
            })}
            value={t}
          >
            <span className={classNames("rounded w-5 h-5", t, { "mr-2": isRTL, "ml-2": isLTR })} />
          </Select.Option>
        )
      })}
    </Select>
  )
}

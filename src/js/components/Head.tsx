import type { ReactNode } from "react"
import { LanguageSelect, ThemeSelect } from "~/components/Select"
import type { TLocale } from "Quran"
import { Theme } from "~/hooks/useTheme"
import classNames from "classnames"

type Props = {
  locale: TLocale
  theme: string
  setTheme: (t: Theme) => void
  children: ReactNode
}

export function Head({ locale, theme, setTheme, children }: Props) {
  const isRTL = locale.direction === "rtl"
  return (
    <header
      className={classNames("flex flex-col h-20 mt-4", {
        "mb-6": locale.direction === "ltr",
        "mb-8": locale.direction === "rtl",
      })}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <a
            data-testid="h1"
            href={`/${locale.name}/`}
            className="flex rounded justify-center p-3 m-0 mb-4 w-full no-underline font-semibold color-secondary text-2xl border-secondary"
          >
            <h1 className="font-bold">{children}</h1>
          </a>
        </div>
        <nav
          className={classNames("flex flex-row justify-between text-lg", {
            "flex-row-reverse": isRTL,
          })}
        >
          <LanguageSelect locale={locale} />
          <ThemeSelect locale={locale} theme={theme} setTheme={setTheme} />
        </nav>
      </div>
    </header>
  )
}

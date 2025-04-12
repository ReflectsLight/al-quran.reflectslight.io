import classNames from "classnames"
import type { TLocale } from "Quran"
import type { ReactNode } from "react"

import { AppContext } from "~/components/App"
import { SettingsIcon } from "~/components/Icon"

type Props = {
  locale: TLocale
  title: string
  children: ReactNode
}

export function Head({ locale, title, children }: Props) {
  const { editSettings, setEditSettings } = useContext(AppContext)
  const isLTR = locale.direction === "ltr"
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
        <nav className={classNames("flex flex-row space-between text-lg")}>
          <span
            className={classNames("font-bold text-base color-primary w-full", { "flex flex-col justify-end": isLTR })}
          >
            {title}
          </span>
          <SettingsIcon onClick={() => setEditSettings(!editSettings)} />
        </nav>
      </div>
    </header>
  )
}

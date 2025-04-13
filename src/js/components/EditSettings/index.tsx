import type { TLocale } from "Quran"

import { ThemeSelect } from "~/components/Select"
import { RecitationSelect } from "~/components/Select"
import { LanguageSelect } from "~/components/Select"
import type { TFunction } from "~/lib/t"

export function EditSettings({ locale, t }: { locale: TLocale; t: TFunction }) {
  return (
    <div className="flex flex-col items-center w-full max-h-24 h-full mt-3 edit-settings">
      <div className="flex flex-col w-11/12">
        <div className="flex flex-row space-between h-8">
          <div className="w-full">{t(locale, "theme")}</div>
          <ThemeSelect locale={locale} />
        </div>
        <div className="flex flex-row space-between h-8">
          <div className="w-full">{t(locale, "recitation")}</div>
          <RecitationSelect locale={locale} />
        </div>
        <div className="flex flex-row space-between h-8">
          <div className="w-full">{t(locale, "language")}</div>
          <LanguageSelect locale={locale} />
        </div>
      </div>
    </div>
  )
}

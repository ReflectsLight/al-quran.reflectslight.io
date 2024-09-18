import type { ReactNode } from "react";
import { LanguageSelect, ThemeSelect } from "~/components/Select";
import type { TLocale } from "Quran";
import { Theme } from "~/hooks/useTheme";
import classNames from "classnames";

type Props = {
  locale: TLocale;
  theme: string;
  setTheme: (t: Theme) => void;
  children: ReactNode;
};

export function Head({ locale, theme, setTheme, children }: Props) {
  return (
    <header
      className={classNames("flex flex-col h-20 mt-4", {
        "mb-4": locale.direction === "ltr",
        "mb-6": locale.direction === "rtl",
      })}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <a
            data-testid="h1"
            href={`/${locale.name}/`}
            className="flex rounded justify-center p-3 m-0 mb-4 w-full no-underline font-semibold text-2xl"
          >
            {children}
          </a>
        </div>
        <nav className="flex flex-row justify-between text-lg">
          <LanguageSelect locale={locale} />
          <ThemeSelect theme={theme} setTheme={setTheme} />
        </nav>
      </div>
    </header>
  );
}

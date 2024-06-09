import React from "react";
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
      className={classNames("flex flex-col h-12 mt-4", {
        "mb-4": locale.direction === "ltr",
        "mb-6": locale.direction === "rtl",
      })}
    >
      <h1 className="flex justify-center p-0 m-0 mb-4">
        <a className="no-underline" href={`/${locale.name}/`}>
          {children}
        </a>
      </h1>
      <nav className="flex flex-row justify-between">
        <LanguageSelect locale={locale} />
        <ThemeSelect theme={theme} setTheme={setTheme} />
      </nav>
    </header>
  );
}

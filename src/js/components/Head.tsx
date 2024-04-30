import React from "react";
import type { ReactNode } from "react";
import { ThemeSelect } from "~/components/ThemeSelect";
import { LanguageSelect } from "~/components/LanguageSelect";
import type { TLocale } from "Quran";
import { Theme } from "~/hooks/useTheme";

type Props = {
  locale: TLocale;
  theme: string;
  setTheme: (t: Theme) => void;
  children: ReactNode;
};

export function Head({ locale, theme, setTheme, children }: Props) {
  return (
    <header className="flex flex-col h-18 mt-4 mb-4">
      <h1 className="flex justify-center p-0 m-0">
        <a className="no-underline" href={`/${locale}/`}>
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

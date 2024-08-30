import type { ReactNode } from "react";
import type { TLocale } from "Quran";
import { Theme } from "~/hooks/useTheme";

type Props = {
  title: string;
  locale: TLocale;
  theme: string;
  setTheme: (t: Theme) => void;
  children: ReactNode;
};

export function Head({ title, locale, children }: Props) {
  return (
    <header className="flex flex-col h-20 mt-4 mb-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <a
            data-testid="h1"
            href={`/${locale.name}/index.html`}
            className="flex rounded justify-center p-3 m-0 mb-4 w-full no-underline"
          >
            {title}
          </a>
        </div>
        <nav className="flex flex-row justify-between">{children}</nav>
      </div>
    </header>
  );
}

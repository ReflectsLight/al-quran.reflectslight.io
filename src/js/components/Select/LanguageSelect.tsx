import { Quran, TLocale } from "Quran";
import { Select } from "~/components/Select";
import classNames from "classnames";

type Props = {
  locale: TLocale;
};

export function LanguageSelect({ locale }: Props) {
  return (
    <Select value={locale.name} className="language-select w-20">
      {Quran.locales.map((l: TLocale, i: number) => {
        const path = location.pathname;
        const href = path.replace(`/${locale.name}/`, `/${l.name}/`);
        return (
          <Select.Option
            key={i}
            className={classNames(
              "flex h-6 w-full justify-center no-underline mb-1 rounded",
              l.direction,
              l.name === locale.name ? "active" : undefined,
            )}
            value={l.name}
            href={l.name === locale.name ? undefined : href}
          >
            {l.displayName}
          </Select.Option>
        );
      })}
    </Select>
  );
}

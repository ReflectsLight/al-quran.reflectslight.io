import { Quran, TLocale } from "Quran";
import { Select } from "~/components/Select";

type Props = {
  locale: TLocale;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export function LanguageSelect({ locale, isOpen, setIsOpen }: Props) {
  return (
    <Select
      value={locale.name}
      className="language-select w-20"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {Quran.locales.map((l: TLocale, i: number) => {
        const path = location.pathname;
        const href = path.replace(`/${locale.name}/`, `/${l.name}/`);
        return (
          <Select.Option
            key={i}
            className={classNames(
              "flex h-5 text-sm w-full items-center justify-center no-underline mb-1 rounded",
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

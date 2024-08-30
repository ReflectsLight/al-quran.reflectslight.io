import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";

type Props = {
  theme: string;
  setTheme: (theme: Theme) => void;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
};

export function ThemeSelect({ theme, setTheme, isOpen, setIsOpen }: Props) {
  const themes: Theme[] = ["blue", "green"];
  return (
    <Select
      value={theme}
      className="theme-select"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {themes.map((t, i) => {
        return (
          <Select.Option
            key={i}
            onClick={() => setTheme(t)}
            className={classNames("block circle mb-1", t)}
            value={t}
          >
            <span className="block w-full h-full" />
          </Select.Option>
        );
      })}
    </Select>
  );
}

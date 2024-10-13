import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";

type Props = {
  theme: string;
  setTheme: (theme: Theme) => void;
};

export function ThemeSelect({ theme, setTheme }: Props) {
  const themes: Theme[] = ["blue", "green"];
  return (
    <Select value={theme} className="theme-select">
      {themes.map((t, i) => {
        return (
          <Select.Option
            key={i}
            onClick={() => setTheme(t)}
            className="flex justify-end w-10 h-6"
            value={t}
          >
            <span className={classNames("rounded w-5 h-5", t)} />
          </Select.Option>
        );
      })}
    </Select>
  );
}

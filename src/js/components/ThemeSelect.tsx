import React from "react";
import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";

interface Props {
  theme: string;
  setTheme: (theme: Theme) => void;
}

export function ThemeSelect({ theme, setTheme }: Props) {
  return (
    <Select
      value={theme}
      className="theme"
      onChange={(o: JSX.Element) => setTheme(o.props.value)}
    >
      <option className="blue" value="blue">
        <span className="circle" />
      </option>
      <option className="green" value="green">
        <span className="circle" />
      </option>
    </Select>
  );
}

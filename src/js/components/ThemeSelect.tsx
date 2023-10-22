import React from "react";
import { Select, SelectOption } from "components/Select";

interface Props {
  setTheme: (theme: string) => void;
  theme: string;
}

export function ThemeSelect({ setTheme, theme }: Props) {
  return (
    <Select
      className="theme"
      value={theme}
      onChange={(o: SelectOption) => setTheme(o.value)}
    >
      <option value="blue">
        <span className="blue" />
      </option>
      <option value="green">
        <span className="green" />
      </option>
    </Select>
  );
}

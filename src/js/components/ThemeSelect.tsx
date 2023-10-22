import React from "react";
import { Select } from "components/Select";

interface Props {
  setTheme: (theme: string) => void;
  theme: string;
}

export function ThemeSelect({ setTheme, theme }: Props) {
  return (
    <Select
      className="theme"
      value={theme}
      onChange={(o: JSX.Element) => setTheme(o.props.value)}
    >
      <option className="blue" value="blue" />
      <option className="green" value="green" />
    </Select>
  );
}

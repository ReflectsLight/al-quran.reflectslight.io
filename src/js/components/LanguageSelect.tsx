import React from "react";
import { Select } from "components/Select";

interface Props {
  locale: string;
  path?: string;
}

export function LanguageSelect({ locale, path = "" }: Props) {
  return (
    <Select
      value={locale}
      className="language"
      onChange={(el: JSX.Element) => {
        const locale = el.props.value;
        location.replace(`/${locale}/${path}`);
      }}
    >
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

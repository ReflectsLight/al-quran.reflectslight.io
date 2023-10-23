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
        const newPath = (() => {
          if (path.endsWith("/") || path.length === 0) {
            return path;
          } else {
            return `${path}/`;
          }
        })();
        const content = document.querySelector(".content.theme");
        content.classList.add("invisible");
        location.replace(`/${locale}/${newPath}`);
      }}
    >
      <option value="ar">عربي</option>
      <option value="en">English</option>
    </Select>
  );
}

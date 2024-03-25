import React from "react";
import { Select } from "~/components/Select";

type Props = {
  locale: string;
}

export function LanguageSelect({ locale }: Props) {
  return (
    <Select
      value={locale}
      className="language"
      onChange={(el: JSX.Element) => {
        const newLocale = el.props.value;
        const content = document.querySelector(".content.theme");
        const path = location.pathname.replace(
          new RegExp(`^/${locale}/`),
          `/${newLocale}/`
        );
        content.classList.add("invisible");
        location.replace(path);
      }}
    >
      <option value="ar">
        <span>عربي</span>
      </option>
      <option value="en">
        <span>English</span>
      </option>
    </Select>
  );
}

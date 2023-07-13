import React, { useState, useEffect } from "react";
import classnames from "classnames";

export type ChangeEvent = React.MouseEvent<HTMLLIElement> & {
  target: HTMLLIElement;
};

export interface SelectOption {
  innerText: string;
  value: string;
  reactEvent: ChangeEvent;
}

interface Props {
  value: string;
  children: JSX.Element[];
  onChange: (e: SelectOption) => void;
  className?: string;
}

const findOption = (value: string, children: JSX.Element[]) => {
  const activeOption = children.find(o => o.props.value === value);
  if (activeOption) {
    return activeOption.props.children;
  } else {
    return null;
  }
};

const createOption = (
  e: ChangeEvent,
  children: JSX.Element[],
): SelectOption => {
  const { target } = e;
  const value = target.getAttribute("data-value")!;
  return {
    innerText: findOption(value, children),
    value,
    reactEvent: e,
  };
};

export function Select({ value, children, onChange, className }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string | null>(
    findOption(value, children),
  );
  const openSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const selectOption = (e: ChangeEvent) => {
    e.stopPropagation();
    const target: HTMLLIElement = e.target;
    const option = createOption(e, children);
    onChange(option);
    setActiveOption(target.innerText);
    setOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className={classnames("react-select", className)}>
      <span className="active-option" onClick={openSelect}>
        {activeOption}
      </span>
      <ul hidden={!open}>
        {children.map((option: JSX.Element, key: number) => {
          return (
            <li
              key={key}
              data-value={option.props.value}
              onClick={selectOption}
            >
              {option.props.children}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

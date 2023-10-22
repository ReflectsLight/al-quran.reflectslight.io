import React, { useState, useEffect } from "react";
import classnames from "classnames";

export type ChangeEvent = React.MouseEvent<HTMLLIElement> & {
  target: HTMLLIElement;
};

interface Props {
  value: string;
  children: JSX.Element[];
  onChange: (e: JSX.Element) => void;
  className?: string;
}

const find = (option: string, options: JSX.Element[]) => {
  return options.find(o => o.props.value === option);
};

export function Select({ value, children, onChange, className }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<JSX.Element>(find(value, children));
  const openSelect = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const selectOption = (e: ChangeEvent) => {
    e.stopPropagation();
    const target: HTMLLIElement = e.target;
    const option = find(String(target.value), children);
    onChange(option);
    setActiveOption(option);
    setOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", () => setOpen(false));
  }, []);

  return (
    <div className={classnames("react-select", className)}>
      <span
        className={classnames("active-option", activeOption.props.value)}
        onClick={openSelect}
       />
      <ul hidden={!open}>
        {children.map((option: JSX.Element, key: number) => {
          return (
            <li
              key={key}
              data-value={option.props.value}
              className={option.props.value}
              onClick={selectOption}
             />
          );
        })}
      </ul>
    </div>
  );
}

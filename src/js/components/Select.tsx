import React, { useState, useEffect } from "react";
import classnames from "classnames";

export type ChangeEvent = React.MouseEvent<HTMLLIElement> & {
  target: HTMLLIElement;
};

type Props = {
  value: string;
  children: JSX.Element[];
  onChange: (e: JSX.Element) => void;
  className?: string;
};

const find = (option: string, options: JSX.Element[]) => {
  return options.find(o => o.props.value === option);
};

export function Select({ value, children, onChange, className }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<JSX.Element>(
    find(value, children),
  );
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, []);

  return (
    <div className={classnames("react-select", className)}>
      <span
        className="selected-option"
        onClick={e => [e.stopPropagation(), setOpen(true)]}
      >
        {selectedOption.props.children}
      </span>
      <div className="br" />
      <ul hidden={!open}>
        {children.map((option: JSX.Element, key: number) => {
          return (
            <li
              key={key}
              data-value={option.props.value}
              className={option.props.value}
              onClick={(e: ChangeEvent) => {
                e.stopPropagation();
                const { target } = e;
                const value =
                  target.getAttribute("data-value") ||
                  target.parentElement.getAttribute("data-value");
                const option: JSX.Element = find(value, children);
                onChange(option);
                setSelectedOption(option);
                setOpen(false);
              }}
            >
              {option.props.children}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import classNames from "classnames";

type Props = {
  value: string;
  children: JSX.Element[];
  onChange: (e: JSX.Element) => void;
  className?: string;
};

export function Select({
  value: option,
  children: within,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<JSX.Element>(
    query(option, { within }),
  );
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, []);

  return (
    <div className={classNames("react-select", className)}>
      <span
        className="selected-option"
        onClick={e => [e.stopPropagation(), setOpen(true)]}
      >
        {selected.props.children}
      </span>
      <div className="br" />
      <ul hidden={!open}>
        {within.map((option: JSX.Element, key: number) => {
          return (
            <li
              key={key}
              data-value={option.props.value}
              className={option.props.value}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                e.stopPropagation();
                const target = e.target as HTMLLIElement;
                const value =
                  target.getAttribute("data-value") ||
                  target.parentElement.getAttribute("data-value");
                const option: JSX.Element = query(value, { within });
                onChange(option);
                setSelected(option);
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

function query(
  option: string,
  options: { within: JSX.Element[] },
): JSX.Element {
  const { within } = options;
  return within.find(({ props: { value } }) => option === value);
}

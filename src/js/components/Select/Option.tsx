import type { ReactNode } from "preact/compat";

type Props = {
  value: string;
  href?: string | undefined;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export function Option({ children, href, className, onClick }: Props) {
  return (
    <a href={href || "#"} className={className} onClick={onClick}>
      {String(children)}
    </a>
  );
}

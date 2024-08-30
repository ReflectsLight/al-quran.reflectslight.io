import type { ReactNode, AnchorHTMLAttributes } from "react";
type Rest = AnchorHTMLAttributes<HTMLAnchorElement>;
type Props = {
  value: string;
  children: ReactNode;
} & Rest;

export function Option({ children, ...rest }: Props) {
  return <a {...rest}>{children}</a>;
}

import type { ReactNode } from "preact/compat"

type Props = {
  value: string
  href?: string | undefined
  className?: string
  onClick?: () => void
  children: ReactNode
}

export function Option({ children, href, className, onClick }: Props) {
  const ref = createRef()
  return (
    <a href={href} className={className} onClick={onClick} ref={ref}>
      {children as string}
    </a>
  )
}

import { uniqBy } from "lodash"

import { Option } from "./Option"

export { LanguageSelect } from "./LanguageSelect"
export { RecitationSelect } from "./RecitationSelect"
export { ThemeSelect } from "./ThemeSelect"

type Props = {
  value: string
  children: JSX.Element[]
  className?: string
}

function Select({ value, children: options, className }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [option, setOption] = useState<JSX.Element | null>(null)
  const sorted = useMemo(
    () =>
      uniqBy(
        [option, ...options].filter((n) => !!n),
        (n: JSX.Element) => n.props.value,
      ),
    [option],
  )
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.addEventListener("click", close)
    return () => document.body.removeEventListener("click", close)
  }, [])

  useEffect(() => {
    setOption(sorted.find((n: JSX.Element) => value === n.props.value) || null)
  }, [value])

  return (
    <div className={classNames("react-select flex flex-col h-full", className)}>
      <ul className="m-0 p-0 list-none text-base h-full">
        {sorted.map((n: JSX.Element, key: number) => {
          const isHidden = !isOpen && option?.props.value !== n.props.value
          return (
            <li
              key={key}
              className={classNames("flex flex-col items-center", { hidden: isHidden })}
              onClick={(e) => {
                e.stopPropagation()
                const { ref } = n.props
                setOpen(!isOpen)
                ref?.current?.click()
              }}
            >
              {n}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Select.Option = Option

export { Select }

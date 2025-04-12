import classNames from "classnames"
import type { TLocale } from "Quran"

import { AppContext } from "~/components/App"
import { Select } from "~/components/Select"
import type { Recitation } from "~/hooks/useRecitation"
import { RECITATIONS } from "~/hooks/useRecitation"

type Props = {
  locale: TLocale
}

export function RecitationSelect({ locale }: Props) {
  const { recitation, setRecitation } = useContext(AppContext)
  const memo = useMemo(() => {
    return (
      <Select value={recitation} className="recitation-select w-full z-20">
        {RECITATIONS.map((r, i: number) => {
          return (
            <Select.Option
              key={i}
              onClick={() => setRecitation(r.id as Recitation)}
              className={classNames(
                "flex flex-col h-6 w-full items-center justify-center no-underline mb-1 rounded border-secondary text-sm",
                locale.direction,
                locale.direction === "rtl" ? "font-noto-sans-arabic" : "font-noto-sans",
              )}
              value={r.id}
            >
              {r.name}
            </Select.Option>
          )
        })}
      </Select>
    )
  }, [locale.name, recitation])
  return memo
}

import type { ReactNode } from "react"

import { SettingsContext } from "~/contexts/SettingsContext"
import { useRecitation } from "~/hooks/useRecitation"
import { useTheme } from "~/hooks/useTheme"

export function App({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme()
  const [recitation, setRecitation] = useRecitation()
  const [editSettings, setEditSettings] = useState(false)
  return (
    // @ts-expect-error invalid type for children
    <SettingsContext.Provider value={{ theme, setTheme, recitation, setRecitation, editSettings, setEditSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

import type { ReactNode } from "react"

import type { Recitation } from "~/hooks/useRecitation"
import { useRecitation } from "~/hooks/useRecitation"
import type { Theme } from "~/hooks/useTheme"
import { useTheme } from "~/hooks/useTheme"

type AppContextType = {
  theme: string
  setTheme: (theme: Theme) => void
  recitation: string
  setRecitation: (recitation: Recitation) => void
  editSettings: boolean
  setEditSettings: (editSettings: boolean) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function App({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme()
  const [recitation, setRecitation] = useRecitation()
  const [editSettings, setEditSettings] = useState(false)
  return (
    // @ts-expect-error invalid type for children
    <AppContext.Provider value={{ theme, setTheme, recitation, setRecitation, editSettings, setEditSettings }}>
      {children}
    </AppContext.Provider>
  )
}

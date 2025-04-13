import type { Recitation } from "~/hooks/useRecitation"
import type { Theme } from "~/hooks/useTheme"

export type TSettingsContext = {
  theme: string
  setTheme: (theme: Theme) => void
  recitation: string
  setRecitation: (recitation: Recitation) => void
  editSettings: boolean
  setEditSettings: (editSettings: boolean) => void
}

export const SettingsContext = createContext<TSettingsContext | null>(null)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettingsContext must be used within a SettingsProvider")
  }
  return context
}

import type { ReactNode } from "react"
import { useTheme } from "~/hooks/useTheme"
import type { Theme } from "~/hooks/useTheme";

type AppContextType = {
  theme: string;
  setTheme: (theme: Theme) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export function App({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useTheme()
  return (
    // @ts-ignore
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  )
}

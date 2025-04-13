type Result = [Recitation, (t: Recitation) => void]

export type Recitation = "alafasy" | "yassin" | "rifai" | "alsuesy"
export const DEFAULT_RECITATION = "alafasy"
export const RECITATIONS = [
  { id: "alafasy", name: "Mishari Al-Afasy" },
  { id: "yassin", name: "Sahl Yassin" },
  { id: "rifai", name: "Hani Ar-Rifai" },
  { id: "alsuesy", name: "Ali As-Suwaisy" },
]
export const RECITATION_IDS = RECITATIONS.map((r) => r.id) as Recitation[]

export function useRecitation(): Result {
  const cookies = Object.fromEntries(document.cookie.split(/;\s*/).map((e) => e.split("=")))
  const [recitation, setRecitation] = useState<Recitation>(
    RECITATION_IDS.find((r) => r === cookies.recitation) || DEFAULT_RECITATION,
  )
  const set = (r: Recitation) => {
    if (RECITATION_IDS.includes(r)) {
      const maxAge = 3600 * 24 * 90
      document.cookie = `recitation=${r}; path=/; max-age=${maxAge}; SameSite=Strict`
      setRecitation(r)
    }
  }
  return [recitation, set]
}

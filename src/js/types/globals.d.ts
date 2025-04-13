import classn from "classnames"
import * as preact from "preact"
import * as hooks from "preact/hooks"

declare global {
  const render: typeof preact.render
  const useState: typeof hooks.useState
  const useEffect: typeof hooks.useEffect
  const useRef: typeof hooks.useRef
  const useContext: typeof hooks.useContext
  const useMemo: typeof hooks.useMemo
  const createRef: typeof preact.createRef
  const createContext: typeof preact.createContext
  const classNames: typeof classn
  const audioUrl: string
  const commitId: string
}

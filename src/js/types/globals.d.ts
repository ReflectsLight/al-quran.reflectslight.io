import * as preact from "preact";
import * as hooks from "preact/hooks";
import classn from "classnames";

declare global {
  const render: typeof preact.render;
  const useState: typeof hooks.useState;
  const useEffect: typeof hooks.useEffect;
  const useRef: typeof hooks.useRef;
  const useMemo: typeof hooks.useMemo;
  const createRef: typeof preact.createRef;
  const classNames: typeof classn;
}

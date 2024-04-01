import { createContext } from "@aria-ui/core"

export const openContext = createContext<boolean>("popover/open", false)
export const triggerElementContext = createContext<HTMLElement | null>(
  "popover/triggerElement",
  null,
)

import { createContext } from "@aria-ui/core"

export const openContext = createContext<boolean>("popover/open", false)

export const onOpenChangeContext = createContext<
  ((open: boolean) => void) | null
>("popover/onOpenChange", null)

export const triggerElementContext = createContext<HTMLElement | null>(
  "popover/triggerElement",
  null,
)

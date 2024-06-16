import { createContext } from "@aria-ui/core"

export const onOpenChangeContext = createContext<
  ((open: boolean) => void) | null
>("menu/onOpenChange", null)

export const triggerElementContext = createContext<HTMLElement | null>(
  "menu/triggerElement",
  null,
)

export const selectedValueContext = createContext(
  "ListboxItem/selectedValue",
  "",
)

export const focusedValueContext = createContext("ListboxItem/focusedValue", "")

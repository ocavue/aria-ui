import { createContext } from "@aria-ui/core"

export const openContext = createContext<boolean>("menu/open", false)

export const triggerElementContext = createContext<HTMLElement | null>(
  "menu/triggerElement",
  null,
)

export const selectedValueContext = createContext(
  "ListboxItem/selectedValue",
  "",
)

export const focusedValueContext = createContext("ListboxItem/focusedValue", "")

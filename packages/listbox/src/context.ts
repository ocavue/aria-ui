import { createContext } from "@aria-ui/core"

export const selectedValueContext = createContext(
  "ListboxItem/selectedValue",
  "",
)

export const focusedValueContext = createContext("ListboxItem/focusedValue", "")

export const availableValueSetContext = createContext<Set<string>>(
  "Listbox/availableValueSet",
  new Set(),
)

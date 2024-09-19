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

export const pointerMovingContext = createContext(
  "Listbox/pointerMoving",
  false,
)

export const listboxEmitterContext = createContext<VoidFunction | null>(
  "Listbox/listboxEmitter",
  null,
)

export const listboxItemEmitterContext = createContext<VoidFunction | null>(
  "Listbox/listboxItemEmitter",
  null,
)

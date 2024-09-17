import { createContext } from "@aria-ui/core"

export const eventTargetContext = createContext<HTMLElement | null>(
  "ComboboxList/eventTarget",
  null,
)

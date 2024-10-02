import { createContext } from "@aria-ui/core"

export const eventTargetContext = createContext<HTMLElement | undefined>(
  "ComboboxList/eventTarget",
  undefined,
)

import { createContext } from "@aria-ui/core"

export const keydownHandlerContext = createContext<
  ((event: KeyboardEvent) => void) | null
>("ComboboxList/keydownHandler", null)

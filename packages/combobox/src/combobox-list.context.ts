import { createContext } from "@aria-ui/core"
import type { KeydownListener } from "@aria-ui/listbox"

export const keydownListenerContext = createContext<KeydownListener | null>(
  "ComboboxList/keydownListener",
  null,
)

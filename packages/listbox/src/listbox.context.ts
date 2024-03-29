import { createContext } from "@aria-ui/core"

export const handlersContext = createContext<{
  onConnected: () => void
  onHighlight: (value: string) => void
} | null>("listbox/handlers", null)

export const selectedValueContext = createContext<string | null>(
  "listbox/selectedValue",
  null,
)

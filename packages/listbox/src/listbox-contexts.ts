import { createContext } from "@aria-ui/core"

export const handlersContext = createContext<{
  onConnected: () => void
  onHighlight: (value: string) => void
} | null>("listbox/handlers", null)

export const selectedValueContext = createContext<string | null>(
  "listbox/selectedValue",
  null,
)

export const queryContext = createContext<string>("listbox/query", "")

export const keydownHandlerContext = createContext<
  ((event: KeyboardEvent) => void) | null
>("listbox/keydownHandler", null)

import { createContext } from "@aria-ui/core"

export const handlersContext = createContext<{
  onConnected: () => void
  onHighlight: (value: string) => void
} | null>("listbox/handlers", null)

export const selectedValueContext = createContext<string | null>(
  "listbox/selectedValue",
  null,
)

/**
 * @internal
 */
export const queryContext = createContext<string>("listbox/query", "")

/**
 * @internal
 */
export const keydownHandlerContext = createContext<
  ((event: KeyboardEvent) => void) | null
>("listbox/keydownHandler", null)

import { createContext } from "@aria-ui/core"
import type { ListboxItemFilter } from "@aria-ui/listbox"

/**
 * @internal
 */
export const rootContext = createContext<HTMLElement | null>(
  "combobox/root",
  null,
)

/**
 * @internal
 */
export const queryContext = createContext<string>("combobox/query", "")

export const filterContext = createContext<ListboxItemFilter | null>(
  "combobox/filter",
  null,
)

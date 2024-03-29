import { createContext } from "@aria-ui/core"

export const hoveringContext = createContext<boolean>("tooltip/hovering", false)

export const focusedContext = createContext<boolean>("tooltip/focused", false)

export const openContext = createContext<boolean>("tooltip/open", false)

export const idContext = createContext<string | null>("tooltip/id", null)

import { createContext } from "@aria-ui/core"

export const hoveringContext = createContext<boolean>("tooltip/hovering")

export const focusedContext = createContext<boolean>("tooltip/focused")

export const openContext = createContext<boolean>("tooltip/open")

export const idContext = createContext<string>("tooltip/id")

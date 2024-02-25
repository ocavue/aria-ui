import { createContext } from "@aria-ui/core"
import type { ReadonlySignal, Signal } from "@aria-ui/core"

export const hoveringContext =
  createContext<Signal<boolean>>("tooltip/hovering")

export const focusedContext = createContext<Signal<boolean>>("tooltip/focused")

export const openContext =
  createContext<ReadonlySignal<boolean>>("tooltip/open")

export const idContext = createContext<Signal<string>>("tooltip/id")

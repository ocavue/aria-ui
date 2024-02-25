import { createContext } from "@aria-ui/core"
import { type Signal } from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"

export const referenceContext =
  createContext<Signal<ReferenceElement | null>>("overlay/reference")

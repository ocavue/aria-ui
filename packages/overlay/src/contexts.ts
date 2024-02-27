import { createContext } from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"

export const referenceContext = createContext<ReferenceElement | null>(
  "overlay/reference",
)

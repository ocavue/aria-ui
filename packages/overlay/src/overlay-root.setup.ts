import { type ConnectableElement, createSignal } from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"

import { referenceContext } from "./contexts"

/**
 * @group OverlayRoot
 * @hidden
 */
export function useOverlayRoot(element: ConnectableElement): void {
  const reference = createSignal<ReferenceElement | null>(null)
  referenceContext.provide(element, reference)
}

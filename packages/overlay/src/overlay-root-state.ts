import { type ConnectableElement, createSignal } from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"
import { referenceContext } from "./contexts"

/**
 * @group OverlayRoot
 */
export function useOverlayRoot(element: ConnectableElement) {
  const reference = createSignal<ReferenceElement | null>(null)
  referenceContext.provide(element, reference)
}

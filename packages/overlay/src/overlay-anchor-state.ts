import { type ConnectableElement, useEffect } from "@aria-ui/core"

import { referenceContext } from "./contexts"

/**
 * @group OverlayAnchor
 */
export function useOverlayAnchor(element: ConnectableElement) {
  const reference = referenceContext.consume(element)

  useEffect(element, () => {
    if (reference) {
      reference.value = element
    }
  })
}

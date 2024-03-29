import { useEffect, type ConnectableElement } from "@aria-ui/core"

import { referenceContext } from "./contexts"

/**
 * @group OverlayAnchor
 */
export function useOverlayAnchor(element: ConnectableElement) {
  const reference = referenceContext.consume(element)

  useEffect(element, () => {
    reference.value = element
  })
}

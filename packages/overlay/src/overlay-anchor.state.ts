import { useEffect, type ConnectableElement } from "@aria-ui/core"

import { referenceContext } from "./contexts"

/**
 * @group OverlayAnchor
 * @hidden
 */
export function useOverlayAnchor(element: ConnectableElement) {
  const reference = referenceContext.consume(element)

  useEffect(element, () => {
    reference.set(element)
  })

  return {}
}

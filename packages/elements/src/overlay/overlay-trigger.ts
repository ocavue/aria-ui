import { useEffect, type HostElement } from '@aria-ui/core'

import type { OverlayStore } from './overlay-store.ts'

/**
 * @internal
 */
export function setupOverlayTrigger(
  host: HostElement,
  getStore: () => OverlayStore | undefined,
): void {
  useEffect(host, () => {
    getStore()?.setAnchorElement(host)
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.registerTrigger(host)
    return () => store.unregisterTrigger(host)
  })
}

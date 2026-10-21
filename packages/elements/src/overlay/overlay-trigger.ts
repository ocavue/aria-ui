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
}

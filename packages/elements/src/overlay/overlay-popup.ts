import type { HostElement } from '@aria-ui/core'
import { computed, defineProps, useEffect } from '@aria-ui/core'
import { useDataState, useElementId, usePresence } from '@aria-ui/utils'

import type { OverlayStore } from './overlay-store.ts'

export interface OverlayPopupProps {}

/**
 * @internal
 */
export const OverlayPopupPropsDeclaration = /* @__PURE__ */ defineProps<OverlayPopupProps>({})

/**
 * @internal
 */
export function setupOverlayPopup(
  host: HostElement,
  getOverlayStore: () => OverlayStore | undefined,
): void {
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getOverlayStore()
    if (!store) return
    store.setPopupId(id)
  })

  const getOpen = computed(() => getOverlayStore()?.getIsOpen() ?? false)

  // `useDataState` must run before `usePresence`: when closing, `useDataState` sets
  // `data-state="closed"` which triggers CSS transitions, then `usePresence` checks
  // `getAnimations()` to wait for those transitions before hiding the element.
  useDataState(host, getOpen)
  usePresence(host, getOpen)
}

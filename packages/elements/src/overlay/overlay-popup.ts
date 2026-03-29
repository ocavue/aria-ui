import type { HostElement } from '@aria-ui/core'
import { defineProps, useEffect } from '@aria-ui/core'
import { useElementId } from '@aria-ui/utils'

import type { OverlayStore } from './overlay-store.ts'

/**
 * @public
 */
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

  useEffect(host, () => {
    const store = getOverlayStore()
    if (!store) return
    const open = store.getIsOpen()
    host.dataset.state = open ? 'open' : 'closed'
  })
}

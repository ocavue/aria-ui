import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  registerCustomElement,
  useEventListener,
  type Store,
} from '@aria-ui/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import {
  OverlayRootPropsDeclaration,
  useOverlayStore,
  type OverlayRootProps,
} from '../overlay/overlay-root.ts'

import { notifyTooltipClosed } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface TooltipRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const TooltipRootPropsDeclaration = OverlayRootPropsDeclaration

/**
 * @public
 */
export interface TooltipRootEvents {
  /**
   * Emitted when the tooltip is opened or closed.
   */
  openChange: OpenChangeEvent
}

declare global {
  interface HTMLElementEventMap {
    openChange: OpenChangeEvent
  }
}

/**
 * @internal
 */
export function setupTooltipRoot(host: HostElement, props: Store<TooltipRootProps>) {
  const store = useOverlayStore(host, props)
  TooltipStoreContext.provide(host, store)
  useEventListener(host, 'openChange', (event) => {
    const open: boolean = event.open
    if (open === false) {
      notifyTooltipClosed()
    }
  })
}

/**
 * @public
 */
export class TooltipRootElement extends defineCustomElement(
  setupTooltipRoot,
  TooltipRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerTooltipRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-tooltip-root', TooltipRootElement)
}

import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, registerCustomElement, type State } from '@aria-ui/core'
import { useEventListener } from '@aria-ui/utils'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import {
  OverlayRootPropsDeclaration,
  useOverlayStore,
  type OverlayRootProps,
} from '../overlay/overlay-root.ts'

import { notifyTooltipClosed } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export { OpenChangeEvent }

export interface TooltipRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const TooltipRootPropsDeclaration = OverlayRootPropsDeclaration

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
export function setupTooltipRoot(host: HostElement, props: State<TooltipRootProps>) {
  const store = useOverlayStore(host, props)
  TooltipStoreContext.provide(host, store)
  useEventListener(host, 'openChange', (event) => {
    const open: boolean = event.detail
    if (!open) {
      notifyTooltipClosed()
    }
  })
}

/**
 * `<aria-ui-tooltip-root>` custom element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * Events: {@link TooltipRootEvents}
 */
export class TooltipRootElement extends defineCustomElement(
  setupTooltipRoot,
  TooltipRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipRootElement(): void {
  registerCustomElement('aria-ui-tooltip-root', TooltipRootElement)
}

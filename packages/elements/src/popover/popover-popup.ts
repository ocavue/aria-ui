import type { HostElement, State } from '@aria-ui/core'
import { defineCustomElement, onMount, registerCustomElement } from '@aria-ui/core'

import {
  OverlayPopupPropsDeclaration,
  setupOverlayPopup,
  type OverlayPopupProps,
} from '../overlay/overlay-popup.ts'

import { PopoverStoreContext, type PopoverStore } from './popover-store.ts'

export interface PopoverPopupProps extends OverlayPopupProps {}

/**
 * @internal
 */
export const PopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPopup(host: HostElement, _props: State<PopoverPopupProps>) {
  const getStore: () => PopoverStore | undefined = PopoverStoreContext.consume(host)
  setupOverlayPopup(host, getStore)

  onMount(host, () => {
    host.role = 'dialog'
  })
}

/**
 * `<aria-ui-popover-popup>` custom element.
 *
 * Properties: {@link PopoverPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
 */
export class PopoverPopupElement extends defineCustomElement(
  setupPopoverPopup,
  PopoverPopupPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverPopupElement(): void {
  registerCustomElement('aria-ui-popover-popup', PopoverPopupElement)
}

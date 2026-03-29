import type { HostElement, Store } from '@aria-ui/core'
import { defineCustomElement, onMount, registerCustomElement } from '@aria-ui/core'

import {
  OverlayPopupPropsDeclaration,
  setupOverlayPopup,
  type OverlayPopupProps,
} from '../overlay/overlay-popup.ts'

import { PopoverStoreContext, type PopoverStore } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverPopupProps extends OverlayPopupProps {}

/**
 * @internal
 */
export const PopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPopup(host: HostElement, _props: Store<PopoverPopupProps>) {
  const getStore: () => PopoverStore | undefined = PopoverStoreContext.consume(host)
  setupOverlayPopup(host, getStore)

  onMount(host, () => {
    host.role = 'dialog'
  })
}

/**
 * @public
 */
export class PopoverPopupElement extends defineCustomElement(
  setupPopoverPopup,
  PopoverPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerPopoverPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-popover-popup', PopoverPopupElement)
}

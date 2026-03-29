import type { HostElement, Store } from '@aria-ui/core'
import { defineCustomElement, onMount, registerCustomElement } from '@aria-ui/core'

import {
  OverlayPopupPropsDeclaration,
  setupOverlayPopup,
  type OverlayPopupProps,
} from '../overlay/overlay-popup.ts'

import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPopupProps extends OverlayPopupProps {}

/**
 * @internal
 */
export const TooltipPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPopup(host: HostElement, _props: Store<TooltipPopupProps>) {
  const getStore = TooltipStoreContext.consume(host)
  setupOverlayPopup(host, getStore)

  onMount(host, () => {
    host.role = 'tooltip'
  })
}

/**
 * @public
 */
export class TooltipPopupElement extends defineCustomElement(
  setupTooltipPopup,
  TooltipPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerTooltipPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-tooltip-popup', TooltipPopupElement)
}

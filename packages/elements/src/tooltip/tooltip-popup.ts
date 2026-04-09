import type { HostElement, State } from '@aria-ui/core'
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
export function setupTooltipPopup(host: HostElement, _props: State<TooltipPopupProps>) {
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

/**
 * @internal
 */
export function registerTooltipPopupElement(): void {
  registerCustomElement('aria-ui-tooltip-popup', TooltipPopupElement)
}

import type { HostElement, State } from '@aria-ui/core'
import { defineCustomElement, onMount, registerCustomElement } from '@aria-ui/core'

import {
  OverlayPopupPropsDeclaration,
  setupOverlayPopup,
  type OverlayPopupProps,
} from '../overlay/overlay-popup.ts'

import { TooltipStoreContext } from './tooltip-store.ts'

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
 * `<aria-ui-tooltip-popup>` custom element.
 *
 * Properties: {@link TooltipPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
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

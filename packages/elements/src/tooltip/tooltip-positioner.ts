import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, registerCustomElement, type State } from '@aria-ui/core'

import {
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '../overlay/overlay-positioner.ts'

import { TooltipStoreContext } from './tooltip-store.ts'

export interface TooltipPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const TooltipPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPositioner(host: HostElement, props: State<TooltipPositionerProps>) {
  setupOverlayPositioner(host, props, TooltipStoreContext.consume(host))
}

/**
 * `<aria-ui-tooltip-positioner>` custom element.
 *
 * Properties: {@link TooltipPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class TooltipPositionerElement extends defineCustomElement(
  setupTooltipPositioner,
  TooltipPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipPositionerElement(): void {
  registerCustomElement('aria-ui-tooltip-positioner', TooltipPositionerElement)
}

import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, registerCustomElement, type State } from '@aria-ui/core'

import {
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '../overlay/overlay-positioner.ts'

import { PopoverStoreContext } from './popover-store.ts'

export interface PopoverPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const PopoverPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPositioner(host: HostElement, props: State<PopoverPositionerProps>) {
  setupOverlayPositioner(host, props, PopoverStoreContext.consume(host))
}

/**
 * `<aria-ui-popover-positioner>` custom element.
 *
 * Properties: {@link PopoverPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class PopoverPositionerElement extends defineCustomElement(
  setupPopoverPositioner,
  PopoverPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverPositionerElement(): void {
  registerCustomElement('aria-ui-popover-positioner', PopoverPositionerElement)
}

import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, defineProps, registerCustomElement, type State } from '@aria-ui/core'
import type { Placement } from '@floating-ui/dom'

import {
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '../overlay/overlay-positioner.ts'

import { MenuStoreContext } from './menu-store.ts'

export interface MenuPositionerProps extends Omit<OverlayPositionerProps, 'placement'> {
  /**
   * The initial placement of the floating element
   *
   * @default "bottom-start"
   */
  placement: Placement
}

/**
 * @internal
 */
export const MenuPositionerPropsDeclaration = defineProps<MenuPositionerProps>({
  ...OverlayPositionerPropsDeclaration,
  placement: {
    default: 'bottom-start',
    attribute: 'placement',
    type: 'string',
  },
})

/**
 * @internal
 */
export function setupMenuPositioner(host: HostElement, props: State<MenuPositionerProps>) {
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = () => getMenuStore()?.overlayStore
  setupOverlayPositioner(host, props, getOverlayStore)
}

/**
 * `<aria-ui-menu-positioner>` custom element.
 *
 * Properties: {@link MenuPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class MenuPositionerElement extends defineCustomElement(
  setupMenuPositioner,
  MenuPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerMenuPositionerElement(): void {
  registerCustomElement('aria-ui-menu-positioner', MenuPositionerElement)
}

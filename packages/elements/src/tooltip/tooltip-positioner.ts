import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui/core'

import {
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '../overlay/overlay-positioner.ts'

import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const TooltipPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPositioner(host: HostElement, props: Store<TooltipPositionerProps>) {
  setupOverlayPositioner(host, props, TooltipStoreContext.consume(host))
}

/**
 * @public
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

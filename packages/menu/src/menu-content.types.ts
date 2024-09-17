import type {
  EventDeclarations,
  KeyDownEventTarget,
  PropDeclarations,
} from "@aria-ui/core"
import {
  popoverContentEvents,
  popoverContentProps,
  type PopoverContentEvents,
  type PopoverContentProps,
} from "@aria-ui/popover"

/**
 * @group MenuContent
 */
export interface MenuContentProps extends PopoverContentProps {
  /**
   * By default, the menu element will listen for keydown events. You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | KeyDownEventTarget | null
}

/**
 * @hidden
 */
export const menuContentProps: PropDeclarations<MenuContentProps> = {
  ...popoverContentProps,
  eventTarget: { default: null },
}

/**
 * @group MenuContent
 */
export type MenuContentEvents = PopoverContentEvents

/**
 * @hidden
 */
export const menuContentEvents: EventDeclarations<MenuContentEvents> =
  popoverContentEvents

import type {
  EventDeclarations,
  PropDeclarations,
  TypedEventTarget,
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
   * By default, the menu element will listen for keydown events. You can pass a
   * different element to listen for keydown events.
   */
  eventTarget?: HTMLElement | TypedEventTarget<"keydown">
}

/**
 * @hidden
 */
export const menuContentProps: PropDeclarations<MenuContentProps> = {
  ...popoverContentProps,
  eventTarget: { default: undefined },
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

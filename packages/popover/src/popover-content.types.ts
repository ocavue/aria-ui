import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  type OverlayPositionerDataAttributes,
  type OverlayPositionerProps,
  overlayPositionerProps,
} from "@aria-ui/overlay"
import type {
  FocusOutsideEvent,
  InteractOutsideEvent,
  PointerDownOutsideEvent,
} from "@zag-js/dismissable"

/**
 * @group PopoverContent
 */
export interface PopoverContentProps extends OverlayPositionerProps {}

/**
 * @hidden
 */
export const popoverContentProps: PropDeclarations<PopoverContentProps> = {
  ...overlayPositionerProps,
}

export type EscapeKeyDownEvent = CustomEvent<{ originalEvent: KeyboardEvent }>

/**
 * @group PopoverContent
 */
export interface PopoverContentEvents {
  /**
   * Fired when the escape key is pressed.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  escapeKeyDown: EscapeKeyDownEvent

  /**
   * Fired when the pointer is pressed down outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  pointerDownOutside: PointerDownOutsideEvent

  /**
   * Fired when the focus is moved outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  focusOutside: FocusOutsideEvent

  /**
   * Fired when an interaction (pointer or focus) happens outside the
   * component.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  interactOutside: InteractOutsideEvent
}

/**
 * @hidden
 */
export const popoverContentEvents: EventDeclarations<PopoverContentEvents> = {
  escapeKeyDown: {},
  pointerDownOutside: {},
  focusOutside: {},
  interactOutside: {},
}

/**
 * @group PopoverContent
 */
export interface PopoverContentDataAttributes extends OverlayPositionerDataAttributes {
  "data-state": "open" | "closed"
}

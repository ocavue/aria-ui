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
export interface PopoverContentProps
  extends Omit<
    OverlayPositionerProps,
    "hoist" | "flip" | "shift" | "offset" | "overflowPadding"
  > {
  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.hoist}
   *
   * @default true
   */
  hoist: OverlayPositionerProps["hoist"]

  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.flip}
   *
   * @default true
   */
  flip: OverlayPositionerProps["flip"]

  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.shift}
   *
   * @default true
   */
  shift: OverlayPositionerProps["shift"]

  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.offset}
   *
   * @default 4
   */
  offset: OverlayPositionerProps["offset"]

  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.overflowPadding}
   *
   * @default 4
   */
  overflowPadding: OverlayPositionerProps["overflowPadding"]
}

export const popoverContentProps: PropDeclarations<PopoverContentProps> = {
  ...overlayPositionerProps,
  hoist: { default: true },
  flip: { default: true },
  shift: { default: true },
  offset: { default: 4 },
  overflowPadding: { default: 4 },
}

export type EscapeKeyDownEvent = CustomEvent<{ originalEvent: KeyboardEvent }>

export interface PopoverContentEvents {
  /**
   * An event fired when the escape key is pressed.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  escapeKeyDown: EscapeKeyDownEvent

  /**
   * An event fired when the pointer is pressed down outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  pointerDownOutside: PointerDownOutsideEvent

  /**
   * An event fired when the focus is moved outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  focusOutside: FocusOutsideEvent

  /**
   * An event fired when an interaction (pointer or focus) happens outside the
   * component.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `preventDefault()`.
   */
  interactOutside: InteractOutsideEvent
}

export const popoverContentEvents: EventDeclarations<PopoverContentEvents> = {
  escapeKeyDown: {},
  pointerDownOutside: {},
  focusOutside: {},
  interactOutside: {},
}

/**
 * @group PopoverContent
 */
export interface PopoverContentDataAttributes
  extends OverlayPositionerDataAttributes {
  "data-state": "open" | "closed"
}

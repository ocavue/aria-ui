import { defineProps } from "@aria-ui/core"
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

  /**
   * Event handler called when the escape key is pressed.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `event.preventDefault`.
   */
  onEscapeKeyDown: ((event: KeyboardEvent) => void) | null

  /**
   * Event handler called when the pointer is pressed down outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `event.preventDefault`.
   */
  onPointerDownOutside: ((event: PointerDownOutsideEvent) => void) | null

  /**
   * Event handler called when the focus is moved outside the element.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `event.preventDefault`.
   */
  onFocusOutside: ((event: FocusOutsideEvent) => void) | null

  /**
   * Function called when an interaction (pointer or focus) happens outside the
   * component.
   *
   * By default, the popover will be closed. It can be prevented by calling
   * `event.preventDefault`.
   */
  onInteractOutside: ((event: InteractOutsideEvent) => void) | null
}

/**
 * @hidden
 */
export const popoverContentProps = defineProps<PopoverContentProps>({
  ...overlayPositionerProps,
  hoist: { default: true },
  flip: { default: true },
  shift: { default: true },
  offset: { default: 4 },
  overflowPadding: { default: 4 },
  onEscapeKeyDown: { default: null },
  onPointerDownOutside: { default: null },
  onFocusOutside: { default: null },
  onInteractOutside: { default: null },
})

/**
 * @group PopoverContent
 */
export interface PopoverContentDataAttributes
  extends OverlayPositionerDataAttributes {
  "data-state": "open" | "closed"
}

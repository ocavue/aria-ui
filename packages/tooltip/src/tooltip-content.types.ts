import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  overlayPositionerEvents,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
  overlayPositionerProps,
} from "@aria-ui/overlay"

/**
 * @group TooltipContent
 */
export interface TooltipContentProps
  extends Omit<OverlayPositionerProps, "hoist"> {
  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.hoist}
   *
   * @default "true"
   */
  hoist: OverlayPositionerProps["hoist"]

  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.flip}
   *
   * @default "true"
   */
  flip: OverlayPositionerProps["flip"]
}

/**
 * @hidden
 */
export const tooltipContentProps: PropDeclarations<TooltipContentProps> = {
  ...overlayPositionerProps,
  hoist: { default: true },
  flip: { default: true },
}

/**
 * @group TooltipContent
 */
export interface TooltipContentDataAttributes {
  "data-state": "open" | "closed"
}

/**
 * @hidden
 */
export interface TooltipContentEvents extends OverlayPositionerEvents {}

/**
 * @hidden
 */
export const tooltipContentEvents: EventDeclarations<OverlayPositionerEvents> =
  overlayPositionerEvents

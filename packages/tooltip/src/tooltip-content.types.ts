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
export interface TooltipContentProps extends OverlayPositionerProps {}

/**
 * @hidden
 */
export const tooltipContentProps: PropDeclarations<TooltipContentProps> = {
  ...overlayPositionerProps,
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

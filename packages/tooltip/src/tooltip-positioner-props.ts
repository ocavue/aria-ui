import type { OverlayPositionerProps } from "@aria-ui/overlay"
import { defaultOverlayPositionerProps } from "@aria-ui/overlay"

/**
 * @group TooltipPositioner
 */
export interface TooltipPositionerProps
  extends Omit<OverlayPositionerProps, "hoist"> {
  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.hoist}
   *
   * @default "true"
   */
  hoist: OverlayPositionerProps["hoist"]
}

/**
 * @hidden
 */
export const defaultTooltipPositionerProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  hoist: true,
}) satisfies TooltipPositionerProps

/**
 * @group TooltipPositioner
 */
export interface TooltipPositionerDataAttributes {
  "data-state": "open" | "closed"
}

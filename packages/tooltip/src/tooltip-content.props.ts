import type { OverlayPositionerProps } from "@aria-ui/overlay"
import { defaultOverlayPositionerProps } from "@aria-ui/overlay"

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
}

/**
 * @hidden
 */
export const defaultTooltipContentProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  hoist: true,
}) satisfies TooltipContentProps

/**
 * @group TooltipContent
 */
export interface TooltipContentDataAttributes {
  "data-state": "open" | "closed"
}

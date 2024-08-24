import { defineProps } from "@aria-ui/core"
import {
  type OverlayPositionerProps,
  overlayPositionerProps,
} from "@aria-ui/overlay"

/**
 * @group TooltipContent
 * @hidden
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
export const tooltipContentProps = defineProps<TooltipContentProps>({
  ...overlayPositionerProps,
  hoist: { default: true },
})

/**
 * @group TooltipContent
 */
export interface TooltipContentDataAttributes {
  "data-state": "open" | "closed"
}

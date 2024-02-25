import type { OverlayPositionerProps } from "@aria-ui/overlay"
import { defaultOverlayPositionerProps } from "@aria-ui/overlay"

/**
 * @group TooltipPositioner
 */
export interface TooltipPositionerProps
  extends Omit<OverlayPositionerProps, "strategy"> {
  /**
   * {@inheritDoc @aria-ui/overlay!OverlayPositionerProps.strategy}
   *
   * @default "fixed"
   */
  strategy: OverlayPositionerProps["strategy"]
}

/**
 * @hidden
 */
export const defaultTooltipPositionerProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  strategy: "fixed",
}) satisfies TooltipPositionerProps

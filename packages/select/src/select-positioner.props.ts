import type { PopoverPositionerProps } from "@aria-ui/popover"
import { defaultPopoverPositionerProps } from "@aria-ui/popover/src/popover-positioner.props"

/**
 * @group SelectPositioner
 */
export interface SelectPositionerProps
  extends Omit<PopoverPositionerProps, "placement"> {
  /**
   * {@inheritDoc @aria-ui/popover!PopoverPositionerProps.placement}
   *
   * @default "bottom"
   */
  placement: PopoverPositionerProps["placement"]
}

/**
 * @hidden
 */
export const defaultSelectPositionerProps = Object.freeze({
  ...defaultPopoverPositionerProps,
  placement: "bottom",
}) satisfies SelectPositionerProps

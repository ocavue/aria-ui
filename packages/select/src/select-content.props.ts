import type { PopoverContentProps as _PopoverContentProps } from "@aria-ui/popover"
import { defaultPopoverContentProps } from "@aria-ui/popover"

/**
 * @group SelectContent
 */
export interface SelectContentProps
  extends Omit<_PopoverContentProps, "placement"> {
  /**
   * {@inheritDoc _PopoverContentProps.placement}
   *
   * @default "bottom"
   */
  placement: _PopoverContentProps["placement"]
}

/**
 * @hidden
 */
export const defaultSelectContentProps = Object.freeze({
  ...defaultPopoverContentProps,
  placement: "bottom",
}) satisfies SelectContentProps

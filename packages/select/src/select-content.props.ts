import {
  type PopoverContentProps,
  defaultPopoverContentProps,
} from "@aria-ui/popover"

/**
 * @group SelectContent
 * @hidden
 */
export interface SelectContentProps
  extends Omit<PopoverContentProps, "placement"> {
  /**
   * {@inheritDoc @aria-ui/popover!PopoverContentProps.placement}
   *
   * @default "bottom"
   */
  placement: PopoverContentProps["placement"]
}

/**
 * @hidden
 */
export const defaultSelectContentProps = Object.freeze({
  ...defaultPopoverContentProps,
  placement: "bottom",
}) satisfies SelectContentProps

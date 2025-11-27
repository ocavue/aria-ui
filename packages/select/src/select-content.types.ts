import type { PropDeclarations } from "@aria-ui/core"
import {
  popoverContentEvents,
  type PopoverContentEvents,
  type PopoverContentProps,
  popoverContentProps,
} from "@aria-ui/popover"

/**
 * @group SelectContent
 * @hidden
 */
export interface SelectContentProps extends Omit<
  PopoverContentProps,
  "placement"
> {
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
export const selectContentProps: PropDeclarations<SelectContentProps> = {
  ...popoverContentProps,
  placement: { default: "bottom" },
}

export interface SelectContentEvents extends PopoverContentEvents {}

export const selectContentEvents = popoverContentEvents

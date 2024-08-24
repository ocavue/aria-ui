import { defineProps } from "@aria-ui/core"
import { type PopoverContentProps, popoverContentProps } from "@aria-ui/popover"

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
export const selectContentProps = defineProps<SelectContentProps>({
  ...popoverContentProps,
  placement: { default: "bottom" },
})

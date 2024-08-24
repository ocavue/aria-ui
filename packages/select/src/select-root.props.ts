import { defineProps } from "@aria-ui/core"
import { popoverRootProps, type PopoverRootProps } from "@aria-ui/popover"

/**
 * @group SelectRoot
 * @internal
 */
export interface SelectRootProps extends PopoverRootProps {}

/**
 * @group SelectRoot
 * @internal
 */
export const selectRootProps = defineProps<SelectRootProps>({
  ...popoverRootProps,
})

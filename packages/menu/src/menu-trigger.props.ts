import { defineProps } from "@aria-ui/core"
import { popoverTriggerProps, type PopoverTriggerProps } from "@aria-ui/popover"

/**
 * @internal
 */
export type MenuTriggerProps = PopoverTriggerProps

/**
 * @internal
 */
export const menuTriggerProps = defineProps<MenuTriggerProps>({
  ...popoverTriggerProps,
})

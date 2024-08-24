import { defineProps } from "@aria-ui/core"
import { popoverRootProps, type PopoverRootProps } from "@aria-ui/popover"

/**
 * @group MenuRoot
 */
export type MenuRootProps = PopoverRootProps

/**
 * @hidden
 */
export const menuRootProps = defineProps<MenuRootProps>({
  ...popoverRootProps,
})

import { defineProps } from "@aria-ui/core"
import { listboxItemProps, type ListboxItemProps } from "@aria-ui/listbox"

/**
 * @group SelectItem
 * @hidden
 */
export interface SelectItemProps extends ListboxItemProps {}

/**
 * @group SelectList
 *
 * @internal
 */
export const selectItemProps = defineProps<SelectItemProps>({
  ...listboxItemProps,
})

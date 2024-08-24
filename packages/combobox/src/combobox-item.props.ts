import { defineProps } from "@aria-ui/core"
import { listboxItemProps, type ListboxItemProps } from "@aria-ui/listbox"

/**
 * @group ComboboxItem
 * @hidden
 */
export interface ComboboxItemProps extends ListboxItemProps {}

/**
 * @group ComboboxItem
 * @internal
 */
export const comboboxItemProps =
  defineProps<ComboboxItemProps>(listboxItemProps)

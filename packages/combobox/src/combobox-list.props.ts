import { defineProps } from "@aria-ui/core"
import { listboxProps, type ListboxProps } from "@aria-ui/listbox"
import omit from "just-omit"

/**
 * @group ComboboxList
 * @internal
 */
export interface ComboboxListProps
  extends Omit<ListboxProps, "onKeydownHandlerAdd"> {}

/**
 * @group ComboboxList
 * @internal
 */
export const comboboxListProps = defineProps<ComboboxListProps>(
  omit(listboxProps, "onKeydownHandlerAdd"),
)

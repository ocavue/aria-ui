import { defineProps } from "@aria-ui/core"
import { listboxProps, type ListboxProps } from "@aria-ui/listbox"
import omit from "just-omit"

/**
 * @group SelectList
 * @internal
 */
export interface SelectListProps extends Omit<ListboxProps, "onValueChange"> {}

/**
 * @group SelectList
 * @internal
 */
export const selectListProps = defineProps<SelectListProps>(
  omit(listboxProps, "onValueChange"),
)

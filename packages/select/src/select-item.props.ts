import {
  defaultListboxItemProps,
  type ListboxItemProps,
} from "@aria-ui/listbox"

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
export const defaultSelectItemProps = Object.freeze({
  ...defaultListboxItemProps,
}) satisfies SelectItemProps

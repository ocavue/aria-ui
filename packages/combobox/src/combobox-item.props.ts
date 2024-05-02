import {
  defaultListboxItemProps,
  type ListboxItemProps,
} from "@aria-ui/listbox"

/**
 * @group ComboboxItem
 * @hidden
 */
export interface ComboboxItemProps extends ListboxItemProps {}

/**
 * @group ComboboxItem
 * @internal
 */
export const defaultComboboxItemProps = Object.freeze({
  ...defaultListboxItemProps,
}) satisfies ComboboxItemProps

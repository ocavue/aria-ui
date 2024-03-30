/**
 * @group ComboboxItem
 */
export interface ComboboxItemProps {
  /**
   * {@inheritDoc @aria-ui/listbox!ListboxItemProps.value}
   *
   * @default ""
   */
  value: string
}

/**
 * @group ComboboxList
 *
 * @internal
 */
export const defaultComboboxItemProps = Object.freeze({
  value: "",
}) satisfies ComboboxItemProps

/**
 * @group ComboboxItem
 */
export interface ComboboxItemProps {
  /**
   * {@inheritDoc @aria-ui/listbox!ListboxItemProps.value}
   */
  value: string | null
}

/**
 * @hidden
 */
export const defaultComboboxItemProps = Object.freeze({
  value: null,
}) satisfies ComboboxItemProps

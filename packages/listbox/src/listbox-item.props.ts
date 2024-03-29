/**
 * @group ListboxItem
 */
export interface ListboxItemProps {
  /**
   * The value of the item. Every item must have a unique value in the parent
   * list.
   */
  value: string | null

  /**
   * The value of the selected item in the current list.
   */
  selectedValue: string | null

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string

  /**
   * The filter function to determine if an item should be shown in the listbox.
   *
   * @default {@link defaultListboxItemFilter}
   */
  filter: ListboxItemFilter

  /**
   * The function to call when the item is highlighted.
   */
  onHighlight: (value: string) => void

  /**
   * The function to call when the item is selected.
   */
  onSelect: (value: string) => void
}

/**
 * The filter function to determine if an item should be shown in the listbox.
 *
 * @group ListboxItem
 */
export type ListboxItemFilter = (options: {
  value: string
  query: string
}) => boolean

/**
 * A simple case-insensitive substring match filter.
 *
 * @group ListboxItem
 */
export const defaultListboxItemFilter: ListboxItemFilter = ({
  value,
  query,
}) => {
  if (!query) {
    return true
  }

  return value
    .toLowerCase()
    .replace(/\s/g, "")
    .includes(query.toLowerCase().replace(/\s/g, ""))
}

/**
 * @hidden
 */
export const defaultListboxItemProps = Object.freeze({
  value: null,
  selectedValue: null,
  query: "",
  filter: defaultListboxItemFilter,
  onHighlight: voidFunction,
  onSelect: voidFunction,
}) satisfies ListboxItemProps

function voidFunction() {
  // do nothing
}

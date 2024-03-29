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
   * The filter function to determine if an item should be shown in the listbox.
   *
   * By default, a simple case-insensitive substring match is used.
   */
  filter: ListboxItemFilter

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string
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

const defaultFilter: ListboxItemFilter = ({ value, query }) => {
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
  filter: defaultFilter,
  query: "",
}) satisfies ListboxItemProps

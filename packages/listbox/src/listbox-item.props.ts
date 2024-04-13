import { type ItemFilter, defaultItemFilter } from "@aria-ui/collection"

/**
 * @group ListboxItem
 */
export interface ListboxItemProps {
  /**
   * The value of the item. Every item must have a unique value in the parent
   * list.
   *
   * @default ""
   */
  value: string

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string

  /**
   * The filter function to determine if an item should be shown in the listbox.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter
}

/**
 * @hidden
 */
export const defaultListboxItemProps = Object.freeze({
  value: "",
  query: "",
  filter: defaultItemFilter,
}) satisfies ListboxItemProps

import { type ItemFilter, defaultItemFilter } from "@aria-ui/collection"

/**
 * @group MenuItem
 * @hidden
 */
export interface MenuItemProps {
  /**
   * The value of the item. Every item must have a unique value in the parent
   * list. By default, a random value is generated.
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

  /**
   * Callback function that is called when the item is selected.
   *
   * @default null
   */
  onSelect: VoidFunction | null
}

/**
 * @hidden
 */
export const defaultMenuItemProps = Object.freeze({
  value: "",
  query: "",
  filter: defaultItemFilter,
  onSelect: null,
}) satisfies MenuItemProps

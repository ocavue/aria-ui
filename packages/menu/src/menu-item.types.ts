import { defaultItemFilter, type ItemFilter } from "@aria-ui/collection"
import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"

/**
 * @group MenuItem
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
}

/**
 * @hidden
 */
export const menuItemProps: PropDeclarations<MenuItemProps> = {
  value: {
    default: "",
  },

  query: {
    default: "",
  },

  filter: {
    default: defaultItemFilter,
  },
}

/**
 * @group MenuItem
 */
export interface MenuItemEvents {
  /**
   * Fired when the item is selected.
   */
  select: CustomEvent<void>
}

/**
 * @hidden
 */
export const menuItemEvents: EventDeclarations<MenuItemEvents> = {
  select: {},
}

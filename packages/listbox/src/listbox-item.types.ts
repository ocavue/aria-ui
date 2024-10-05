import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"

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
}

/**
 * @hidden
 */
export const listboxItemProps: PropDeclarations<ListboxItemProps> = {
  value: { default: "" },
}

/**
 * @hidden
 */
export interface ListboxItemEvents {
  /**
   * Fired when the item is selected.
   */
  select: CustomEvent<void>
}

/**
 * @hidden
 */
export const listboxItemEvents: EventDeclarations<ListboxItemEvents> = {
  select: {},
}

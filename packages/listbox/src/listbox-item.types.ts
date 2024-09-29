import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from "@aria-ui/core"

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
export interface ListboxItemEvents extends EmptyObject {
  /**
   * Fired when the item is selected.
   */
  select: SelectEvent
}

/**
 * @hidden
 */
export const listboxItemEvents: EventDeclarations<ListboxItemEvents> = {
  select: {},
}

/**
 * @hidden
 */
export type SelectEvent = CustomEvent<void>

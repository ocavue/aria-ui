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
export interface ListboxItemEvents extends EmptyObject {}

/**
 * @hidden
 */
export const listboxItemEvents: EventDeclarations<ListboxItemEvents> = {}

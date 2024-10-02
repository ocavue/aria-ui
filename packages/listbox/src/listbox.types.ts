import { defaultItemFilter, type ItemFilter } from "@aria-ui/collection"
import type {
  EventDeclarations,
  PropDeclarations,
  TypedEventTarget,
} from "@aria-ui/core"

/**
 * @group Listbox
 */
export interface ListboxProps {
  /**
   * The selected value.
   *
   * @default ""
   */
  value: string

  /**
   * Listbox selection mode
   *
   * (Currently only single selection mode is implemented)
   *
   * @default "single"
   */
  selectionMode: "multiple" | "single"

  /**
   * Whether the listbox should automatically set the focus to the first item
   * when the listbox is mounted or when the query changes.
   *
   * @default false
   */
  autoFocus: boolean

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string

  /**
   * The filter function to determine if an item should be shown in the listbox.
   * By default, a simple case-insensitive substring match is used. You can
   * provide a custom filter function to match against a more complex pattern.
   * You can also pass `null` to disable filtering and allow all items to be
   * shown.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null

  /**
   * By default, the Listbox element will listen for keydown events. You can
   * pass a different element to listen for keydown events.
   */
  eventTarget?: HTMLElement | TypedEventTarget<"keydown">
}

/**
 * @hidden
 */
export const listboxProps: PropDeclarations<ListboxProps> = {
  value: { default: "" },
  selectionMode: { default: "single" },
  autoFocus: { default: false },
  query: { default: "" },
  filter: { default: defaultItemFilter },
  eventTarget: { default: undefined },
}

/**
 * @group Listbox
 */
export interface ListboxEvents {
  valueChange: CustomEvent<string>
}

/**
 * @hidden
 */
export const listboxEvents: EventDeclarations<ListboxEvents> = {
  valueChange: {},
}

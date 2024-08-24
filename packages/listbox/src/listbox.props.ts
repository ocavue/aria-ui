import { defaultItemFilter, type ItemFilter } from "@aria-ui/collection"
import { defineProps } from "@aria-ui/core"

/**
 * @group Listbox
 * @hidden
 */
export interface ListboxProps {
  /**
   * The selected value.
   *
   * @default ""
   */
  value: string

  /**
   * Event handler called when the value changes.
   *
   * @default null
   */
  onValueChange: ((value: string) => void) | null

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
   * By default, the Listbox element will listen for keydown events. However,
   * you can pass `onKeydownHandlerAdd` to override the default behavior.
   * `onKeydownHandlerAdd` receives a keydown handler when the Listbox element
   * is mounted, and returns a function that will be called when the Listbox
   * element is unmounted.
   *
   * @default null
   */
  onKeydownHandlerAdd:
    | ((handler: (event: KeyboardEvent) => void) => VoidFunction)
    | null
}

/**
 * @hidden
 */
export const listboxProps = defineProps<ListboxProps>({
  value: { default: "" },
  onValueChange: { default: null },
  selectionMode: { default: "single" },
  autoFocus: { default: false },
  query: { default: "" },
  filter: { default: defaultItemFilter },
  onKeydownHandlerAdd: { default: null },
})

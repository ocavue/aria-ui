import { defaultItemFilter, type ItemFilter } from "@aria-ui/collection"

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
   * Event handler called when the value changes.
   *
   * @default null
   */
  onValueChange: ((value: string) => void) | null

  /**
   * Listbox selection mode
   *
   * @default "single"
   */
  selectionMode: "multiple" | "single"

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
export const defaultListboxProps = Object.freeze({
  value: "",
  onValueChange: null,
  selectionMode: "single",
  query: "",
  filter: defaultItemFilter,
  onKeydownHandlerAdd: null,
}) satisfies ListboxProps

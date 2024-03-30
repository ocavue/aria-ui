/**
 * @group Listbox
 */
export interface ListboxProps {
  /**
   * Listbox selection mode
   *
   * @default "single"
   */
  selectionMode: "multiple" | "single"

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
  selectionMode: "single",
  onKeydownHandlerAdd: null,
}) satisfies ListboxProps

export type RefCallback<T> = (ref: T | null) => void

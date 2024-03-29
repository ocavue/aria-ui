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
   * A callback to register a keydown listener. This callback receives a keydown
   * event listener when the Listbox element is mounted, and null when it is
   * unmounted.
   *
   * @default null
   */
  keydownListenerRef: RefCallback<(event: KeyboardEvent) => void> | null
}

/**
 * @hidden
 */
export const defaultListboxProps = Object.freeze({
  selectionMode: "single",
  keydownListenerRef: null,
}) satisfies ListboxProps

export type RefCallback<T> = (ref: T | null) => void

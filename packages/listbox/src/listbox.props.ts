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
   * A element that listens to keydown events.
   */
  root: HTMLElement | null
}

/**
 * @hidden
 */
export const defaultListboxProps = Object.freeze({
  selectionMode: "single",
  root: null,
}) satisfies ListboxProps

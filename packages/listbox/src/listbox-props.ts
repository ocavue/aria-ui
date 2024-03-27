export interface ListboxProps {
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
   * By default, a simple case-insensitive substring match is used.
   */
  filter: (options: { value: string; query: string }) => boolean
}

function defaultFilter({ value, query }: { value: string; query: string }) {
  if (!query) {
    return true
  }
  return value.toLowerCase().includes(query.toLowerCase())
}

export const defaultListboxProps = Object.freeze({
  selectionMode: "single",
  query: "",
  filter: defaultFilter,
}) satisfies ListboxProps

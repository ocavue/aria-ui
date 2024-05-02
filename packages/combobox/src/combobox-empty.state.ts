import type { ConnectableElement } from "@aria-ui/core"
import { useListboxEmpty } from "@aria-ui/listbox"

/**
 * @group ComboboxEmpty
 * @hidden
 */
export function useComboboxEmpty(element: ConnectableElement) {
  return useListboxEmpty(element)
}

import type { ConnectableElement } from "@aria-ui/core"
import { useListboxEmpty } from "@aria-ui/listbox/elements"

/**
 * @group ComboboxEmpty
 * @hidden
 */
export function useComboboxEmpty(element: ConnectableElement): void {
  useListboxEmpty(element)
}

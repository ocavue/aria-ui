import type { ConnectableElement, SetupOptions } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox/elements"

import type {
  ComboboxItemEvents,
  ComboboxItemProps,
} from "./combobox-item.types"

/**
 * @group ComboboxItem
 * @hidden
 */
export function useComboboxItem(
  element: ConnectableElement,
  options: SetupOptions<ComboboxItemProps, ComboboxItemEvents>,
): void {
  useListboxItem(element, options)
}

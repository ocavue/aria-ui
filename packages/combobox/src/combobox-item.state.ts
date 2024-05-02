import type { ConnectableElement, SignalState } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import type { ComboboxItemProps } from "./combobox-item.props"

/**
 * @group ComboboxItem
 * @hidden
 */
export function useComboboxItem(
  element: ConnectableElement,
  props?: Partial<ComboboxItemProps>,
): SignalState<ComboboxItemProps> {
  return useListboxItem(element, props)
}

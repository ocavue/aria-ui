import type { ConnectableElement, SignalState } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import type { SelectItemProps } from "./select-item.props"

/**
 * @group SelectItem
 * @hidden
 */
export function useSelectItem(
  element: ConnectableElement,
  state: SignalState<SelectItemProps>,
): void {
  useListboxItem(element, state)
}

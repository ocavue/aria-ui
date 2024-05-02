import type { ConnectableElement, SignalState } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import type { SelectItemProps } from "./select-item.props"

/**
 * @group SelectItem
 * @hidden
 */
export function useSelectItem(
  element: ConnectableElement,
  props?: Partial<SelectItemProps>,
): SignalState<SelectItemProps> {
  const listboxItemState = useListboxItem(element, {
    ...props,
  })

  const { value } = listboxItemState
  return { value }
}

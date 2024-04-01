import type { ConnectableElement, SingalState } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import type { SelectItemProps } from "./select-item.props"

/**
 * @group SelectItem
 */
export function useSelectItem(
  element: ConnectableElement,
  props?: Partial<SelectItemProps>,
): SingalState<SelectItemProps> {
  const listboxItemState = useListboxItem(element, {
    ...props,
  })

  const { value } = listboxItemState
  return { value }
}

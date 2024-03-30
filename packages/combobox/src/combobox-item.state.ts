import {
  useEffect,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import { inputValueContext } from "./combobox-item.context"
import type { ComboboxItemProps } from "./combobox-item.props"

/**
 * @group ComboboxItem
 */
export function useComboboxItem(
  element: ConnectableElement,
  props?: Partial<ComboboxItemProps>,
): SingalState<ComboboxItemProps> {
  const listboxItemState = useListboxItem(element, {
    ...props,
  })

  const inputValue = inputValueContext.consume(element)

  useEffect(element, () => {
    listboxItemState.query.value = inputValue.value
  })

  const { value } = listboxItemState
  return { value }
}

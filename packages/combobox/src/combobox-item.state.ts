import {
  useEffect,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox"

import { filterContext, queryContext } from "./combobox.context"

import type { ComboboxItemProps } from "."

/**
 * @group ComboboxItem
 */
export function useComboboxItem(
  element: ConnectableElement,
  props?: Partial<ComboboxItemProps>,
): SingalState<ComboboxItemProps> {
  const listboxItemState = useListboxItem(element, props)

  const query = queryContext.consume(element)
  const filter = filterContext.consume(element)

  useEffect(element, () => {
    const value = query.value
    listboxItemState.query.value = value
  })

  useEffect(element, () => {
    const value = filter.value
    if (value) {
      listboxItemState.filter.value = value
    }
  })

  return { value: listboxItemState.value }
}

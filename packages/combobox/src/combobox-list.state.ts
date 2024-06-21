import { mapSignals, useEffect, type ConnectableElement } from "@aria-ui/core"
import {
  defaultListboxProps,
  useListbox,
  type ListboxProps,
} from "@aria-ui/listbox"

import { inputValueContext } from "./combobox-item.context"
import { keydownHandlerContext } from "./combobox-list.context"

/**
 * @group ComboboxList
 * @hidden
 */
export function useComboboxList(element: ConnectableElement): void {
  const keydownHandler = keydownHandlerContext.consume(element)

  const inputValue = inputValueContext.consume(element)

  const listboxState = mapSignals<ListboxProps>(defaultListboxProps)

  listboxState.onKeydownHandlerAdd.set((handler) => {
    keydownHandler.set(handler)
    return () => {
      keydownHandler.set(null)
    }
  })

  useListbox(element, listboxState)

  useEffect(element, () => {
    listboxState.query.set(inputValue.get())
  })
}

import { useEffect, type ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { inputValueContext } from "./combobox-item.context"
import { keydownHandlerContext } from "./combobox-list.context"

/**
 * @group ComboboxList
 * @hidden
 */
export function useComboboxList(element: ConnectableElement) {
  const keydownHandler = keydownHandlerContext.consume(element)

  const { query } = useListbox(element, {
    onKeydownHandlerAdd: (handler) => {
      keydownHandler.set(handler)
      return () => {
        keydownHandler.set(null)
      }
    },
  })

  const inputValue = inputValueContext.consume(element)

  useEffect(element, () => {
    query.set(inputValue.get())
  })

  return {}
}

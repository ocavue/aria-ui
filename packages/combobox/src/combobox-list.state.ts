import type { ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { keydownHandlerContext } from "./combobox-list.context"

/**
 * @group ComboboxList
 */
export function useComboboxList(element: ConnectableElement) {
  const keydownHandler = keydownHandlerContext.consume(element)

  useListbox(element, {
    onKeydownHandlerAdd: (handler) => {
      keydownHandler.value = handler
      return () => {
        keydownHandler.value = null
      }
    },
  })
}

import type { ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { keydownListenerContext } from "./combobox-list.context"

/**
 * @group ComboboxList
 */
export function useComboboxList(element: ConnectableElement) {
  const keydownListener = keydownListenerContext.consume(element)

  useListbox(element, {
    keydownListenerRef: (listener) => {
      keydownListener.value = listener
    },
  })
}

import { createSignal, useEffect, type ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { rootContext } from "./combobox.context"

/**
 * @group ComboboxList
 */
export function useComboboxList(element: ConnectableElement) {
  const keydownListener = createSignal<((event: KeyboardEvent) => void) | null>(
    null,
  )

  useListbox(element, {
    keydownListenerRef: (value) => {
      keydownListener.value = value
    },
  })

  const root = rootContext.consume(element)

  useEffect(element, () => {
    const rootValue = root.value
    const keydownListenerValue = keydownListener.value

    if (rootValue && keydownListenerValue) {
      rootValue.addEventListener("keydown", keydownListenerValue)
      return () =>
        rootValue.removeEventListener("keydown", keydownListenerValue)
    }
  })
}

import { useEffect, type ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { rootContext } from "./combobox.context"

/**
 * @group ComboboxList
 */
export function useComboboxList(element: ConnectableElement) {
  const listboxState = useListbox(element)

  const root = rootContext.consume(element)

  useEffect(element, () => {
    listboxState.root.value = root.value
  })
}

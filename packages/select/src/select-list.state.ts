import type { ConnectableElement } from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { selectedValueContext } from "./select-root.context"

/**
 * @group SelectList
 * @hidden
 */
export function useSelectList(element: ConnectableElement) {
  const selectedValue = selectedValueContext.consume(element)

  useListbox(element, {
    onValueChange: (value: string) => {
      selectedValue.set(value)
    },
  })

  return {}
}

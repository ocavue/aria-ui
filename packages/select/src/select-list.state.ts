import { mapSignals, type ConnectableElement } from "@aria-ui/core"
import { defaultListboxProps, useListbox } from "@aria-ui/listbox"

import { selectedValueContext } from "./select-root.context"

/**
 * @group SelectList
 * @hidden
 */
export function useSelectList(element: ConnectableElement): void {
  const selectedValue = selectedValueContext.consume(element)

  useListbox(
    element,
    mapSignals({
      ...defaultListboxProps,
      onValueChange: (value: string) => {
        selectedValue.set(value)
      },
    }),
  )
}

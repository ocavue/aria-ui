import {
  createSignal,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import type { SelectListProps } from "./select-list.props"
import { selectedValueContext } from "./select-root.context"

/**
 * @group SelectList
 * @hidden
 */
export function useSelectList(
  element: ConnectableElement,
  state: SignalState<SelectListProps>,
): void {
  const selectedValue = selectedValueContext.consume(element)

  useListbox(element, {
    ...state,
    onValueChange: createSignal((value: string) => {
      selectedValue.set(value)
    }),
  })
}

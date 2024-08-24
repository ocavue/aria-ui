import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox"

import { inputValueContext } from "./combobox-item.context"
import { keydownHandlerContext } from "./combobox-list.context"
import type { ComboboxListProps } from "./combobox-list.props"

/**
 * @group ComboboxList
 * @hidden
 */
export function useComboboxList(
  element: ConnectableElement,
  state: SignalState<ComboboxListProps>,
): void {
  const keydownHandler = keydownHandlerContext.consume(element)

  const inputValue = inputValueContext.consume(element)

  useListbox(element, {
    ...state,
    onKeydownHandlerAdd: createSignal((handler) => {
      keydownHandler.set(handler)
      return () => {
        keydownHandler.set(null)
      }
    }),
  })

  useEffect(element, () => {
    state.query.set(inputValue.get())
  })
}

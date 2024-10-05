import {
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { useListbox } from "@aria-ui/listbox/elements"

import { inputValueContext } from "./combobox-item.context"
import { eventTargetContext } from "./combobox-list.context"
import type {
  ComboboxListEvents,
  ComboboxListProps,
} from "./combobox-list.types"

/**
 * @group ComboboxList
 * @hidden
 */
export function useComboboxList(
  element: ConnectableElement,
  { state, emit }: SetupOptions<ComboboxListProps, ComboboxListEvents>,
): void {
  const eventTarget = eventTargetContext.consume(element)

  const inputValue = inputValueContext.consume(element)

  useListbox(element, {
    state: {
      ...state,
      eventTarget: eventTarget,
    },
    emit,
  })

  useEffect(element, () => {
    state.query.set(inputValue.get())
  })
}

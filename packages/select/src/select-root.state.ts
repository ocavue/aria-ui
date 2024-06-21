import {
  createSignal,
  type ConnectableElement,
  useEffect,
  type SignalState,
} from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover"

import { selectedValueContext } from "./select-root.context"
import type { SelectRootProps } from "./select-root.props"

/**
 * @group SelectRoot
 * @hidden
 */
export function useSelectRoot(
  element: ConnectableElement,
  state: SignalState<SelectRootProps>,
): void {
  const selectedValue = createSignal("")
  selectedValueContext.provide(element, selectedValue)

  usePopoverRoot(element, state)

  useEffect(element, () => {
    let prevSelected = ""
    const currSelected = selectedValue.get()
    if (currSelected !== prevSelected) {
      state.open.set(false)
    }
    prevSelected = currSelected
  })
}

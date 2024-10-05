import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover/elements"

import { selectedValueContext } from "./select-root.context"
import type { SelectRootEvents, SelectRootProps } from "./select-root.types"

/**
 * @group SelectRoot
 * @hidden
 */
export function useSelectRoot(
  element: ConnectableElement,
  { state, emit }: SetupOptions<SelectRootProps, SelectRootEvents>,
): void {
  const selectedValue = createSignal("")
  selectedValueContext.provide(element, selectedValue)

  usePopoverRoot(element, { state, emit })

  useEffect(element, () => {
    let prevSelected = ""
    const currSelected = selectedValue.get()
    if (currSelected !== prevSelected) {
      state.open.set(false)
    }
    prevSelected = currSelected
  })
}

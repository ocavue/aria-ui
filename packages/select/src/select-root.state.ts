import { createSignal, type ConnectableElement, useEffect } from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover"

import { selectedValueContext } from "./select-root.context"

/**
 * @group SelectRoot
 * @hidden
 */
export function useSelectRoot(element: ConnectableElement) {
  const selectedValue = createSignal("")
  selectedValueContext.provide(element, selectedValue)

  const popoverRootState = usePopoverRoot(element)

  useEffect(element, () => {
    let prevSelected = ""
    const currSelected = selectedValue.get()
    if (currSelected !== prevSelected) {
      popoverRootState.open.value = false
    }
    prevSelected = currSelected
  })

  return {}
}

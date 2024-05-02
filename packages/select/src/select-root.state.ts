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
    return selectedValue.subscribe(() => {
      popoverRootState.open.value = false
    })
  })

  return {}
}

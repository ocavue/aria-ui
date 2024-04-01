import {
  setAriaRole,
  useEventListener,
  type ConnectableElement,
  useEffect,
} from "@aria-ui/core"
import { useOverlayAnchor } from "@aria-ui/overlay"

import { openContext, triggerElementContext } from "./popover-root.context"

/**
 * @group PopoverTrigger
 */
export function usePopoverTrigger(element: ConnectableElement): void {
  useOverlayAnchor(element)
  setAriaRole(element, "button")

  const open = openContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useEffect(element, () => {
    triggerElement.value = element
  })

  useEventListener(element, "click", () => {
    open.value = !open.value
  })
}

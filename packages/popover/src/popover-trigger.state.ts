import {
  useEventListener,
  type ConnectableElement,
  useEffect,
  useAriaRole,
} from "@aria-ui/core"
import { useOverlayAnchor } from "@aria-ui/overlay"

import { openContext, triggerElementContext } from "./popover-root.context"

/**
 * @group PopoverTrigger
 */
export function usePopoverTrigger(element: ConnectableElement): void {
  useOverlayAnchor(element)
  useAriaRole(element, "button")

  // Make the trigger focusable
  useEffect(element, () => {
    element.tabIndex = 0
  })

  const open = openContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useEffect(element, () => {
    triggerElement.value = element
  })

  useEventListener(element, "click", () => {
    open.value = !open.value
  })
}

import {
  useAriaRole,
  useEffect,
  useEventListener,
  type ConnectableElement,
} from "@aria-ui/core"
import { useOverlayAnchor } from "@aria-ui/overlay/elements"

import {
  onOpenChangeContext,
  openContext,
  triggerElementContext,
} from "./popover-root.context"

/**
 * @group PopoverTrigger
 * @hidden
 */
export function usePopoverTrigger(element: ConnectableElement): void {
  useOverlayAnchor(element)
  useAriaRole(element, "button")

  const open = openContext.consume(element)
  const onOpenChange = onOpenChangeContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useEffect(element, () => {
    triggerElement.set(element)
  })

  useEventListener(element, "click", () => {
    onOpenChange?.peek()?.(!open.peek())
  })
}

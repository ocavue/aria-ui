import {
  type ConnectableElement,
  useEventListener,
  useAriaAttribute,
} from "@aria-ui/core"
import { useOverlayAnchor } from "@aria-ui/overlay"

import {
  focusedContext,
  hoveringContext,
  idContext,
  openContext,
} from "./tooltip.context"

/**
 * @group TooltipTrigger
 */
export function useTooltipTrigger(element: ConnectableElement): void {
  useOverlayAnchor(element)

  const hovering = hoveringContext.consume(element)
  const focused = focusedContext.consume(element)
  const open = openContext.consume(element)
  const id = idContext.consume(element)

  if (hovering) {
    useEventListener(element, "pointerenter", () => {
      hovering.value = true
    })
    useEventListener(element, "pointerleave", () => {
      hovering.value = false
    })
  }
  if (focused) {
    useEventListener(element, "focusin", () => {
      focused.value = true
    })
    useEventListener(element, "focusout", () => {
      focused.value = false
    })
  }
  useAriaAttribute(element, "aria-describedby", () => {
    return open.value && id.value ? id.value : undefined
  })
}

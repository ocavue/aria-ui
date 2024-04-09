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

  useEventListener(element, "pointerenter", () => {
    hovering.value = true
  })
  useEventListener(element, "pointerleave", () => {
    hovering.value = false
  })
  useEventListener(element, "focusin", () => {
    focused.value = true
  })
  useEventListener(element, "focusout", () => {
    focused.value = false
  })

  // Close the tooltip when the trigger is pressed (by pointer or keyboard)
  const handlePress = () => {
    hovering.value = false
    focused.value = false
  }
  useEventListener(element, "pointerdown", handlePress)
  useEventListener(element, "keydown", handlePress)

  useAriaAttribute(element, "aria-describedby", () => {
    return open.value && id.value ? id.value : undefined
  })
}

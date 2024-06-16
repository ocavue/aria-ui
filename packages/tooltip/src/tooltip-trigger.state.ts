import {
  useAriaAttribute,
  useEventListener,
  type ConnectableElement,
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
 * @hidden
 */
export function useTooltipTrigger(element: ConnectableElement) {
  useOverlayAnchor(element)

  const hovering = hoveringContext.consume(element)
  const focused = focusedContext.consume(element)
  const open = openContext.consume(element)
  const id = idContext.consume(element)

  useEventListener(element, "pointerenter", () => {
    hovering.set(true)
  })
  useEventListener(element, "pointerleave", () => {
    hovering.set(false)
  })
  useEventListener(element, "focusin", () => {
    focused.set(true)
  })
  useEventListener(element, "focusout", () => {
    focused.set(false)
  })

  // Close the tooltip when the trigger is pressed (by pointer or keyboard)
  const handlePress = () => {
    hovering.set(false)
    focused.set(false)
  }
  useEventListener(element, "click", handlePress)
  useEventListener(element, "keydown", handlePress)

  useAriaAttribute(element, "aria-describedby", () => {
    const openValue = open.get()
    const idValue = id.get()
    return openValue && idValue ? idValue : undefined
  })

  return {}
}

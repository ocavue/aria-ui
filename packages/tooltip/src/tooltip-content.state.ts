import {
  useAriaAttribute,
  useAttribute,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"

import {
  defaultTooltipContentProps,
  type TooltipContentProps,
} from "./tooltip-content.props"
import { idContext, openContext } from "./tooltip.context"

/**
 * Properties: {@link TooltipContentProps}
 *
 * Data attributes: {@link TooltipContentDataAttributes}
 *
 * @group TooltipContent
 * @hidden
 */
export function useTooltipContent(
  element: ConnectableElement,
  props?: Partial<TooltipContentProps>,
): SignalState<TooltipContentProps> {
  const state = useOverlayPositioner(element, {
    ...defaultTooltipContentProps,
    ...props,
  })

  const open = openContext.consume(element)
  const id = idContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.get()}`)
  useAttribute(element, "id", () => id.get() || undefined)
  usePresence(element, open)
  useAttribute(element, "data-state", () => (open.get() ? "open" : "closed"))

  return state
}

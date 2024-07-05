import {
  createSignal,
  useAriaAttribute,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"

import type { TooltipContentProps } from "./tooltip-content.props"
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
  state: SignalState<TooltipContentProps>,
): void {
  const open = openContext.consume(element)
  const id = idContext.consume(element)

  const hoist = createSignal<boolean>(state.hoist.peek())
  const visible = usePresence(element, open)
  // Only set hoist to true if the tooltip is visible. By doing that, we can
  // ensure that the tooltip is at the top of the top-layer stacking context, so
  // that it is not hidden behind other elements.
  useEffect(element, () => {
    hoist.set(visible.get() ? state.hoist.get() : false)
  })

  useOverlayPositioner(element, { ...state, hoist })

  useAriaAttribute(element, "aria-hidden", () => `${!open.get()}`)
  useAttribute(element, "id", () => id.get() || undefined)
  useAttribute(element, "data-state", () => (open.get() ? "open" : "closed"))
}

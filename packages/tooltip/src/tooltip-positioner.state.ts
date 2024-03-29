import {
  useAriaAttribute,
  useAttribute,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import { useTooltipPositionerProps } from "./tooltip-positioner.context.gen"
import type { TooltipPositionerProps } from "./tooltip-positioner.props"
import { idContext, openContext } from "./tooltip.context"

/**
 * Properties: {@link TooltipPositionerProps}
 *
 * Data attributes: {@link TooltipPositionerDataAttributes}
 *
 * @group TooltipPositioner
 */
export function useTooltipPositioner(
  element: ConnectableElement,
  props?: Partial<TooltipPositionerProps>,
): SingalState<TooltipPositionerProps> {
  const state = useTooltipPositionerProps(element, props)

  const open = openContext.consume(element)
  const id = idContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.value}`)
  useAttribute(element, "id", () => id.value || undefined)
  usePresence(element, open)
  useAttribute(element, "data-state", () => (open.value ? "open" : "closed"))

  return state
}

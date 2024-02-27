import {
  assignProps,
  useAriaAttribute,
  useAttribute,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"

import { idContext, openContext } from "./tooltip-contexts"
import {
  defaultTooltipPositionerProps,
  type TooltipPositionerProps,
} from "./tooltip-positioner-props"

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
  const state = useOverlayPositioner(
    element,
    assignProps(defaultTooltipPositionerProps, props),
  )

  const open = openContext.consume(element)
  const id = idContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.value}`)
  useAttribute(element, "id", () => id.value || undefined)
  usePresence(element, open)
  useAttribute(element, "data-state", () => (open.value ? "open" : "closed"))

  return state
}

import {
  assignProps,
  useAriaAttribute,
  useAttribute,
  useStyle,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"

import { idContext, openContext } from "./tooltip-contexts"
import {
  defaultTooltipPositionerProps,
  type TooltipPositionerProps,
} from "./tooltip-positioner-props"

/**
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
  useStyle(element, "display", () => (open.value ? "" : "none"))

  return state
}

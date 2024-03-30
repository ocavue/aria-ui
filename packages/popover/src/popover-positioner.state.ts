import {
  useAriaAttribute,
  useAttribute,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import { useOverlayPositionerState } from "@aria-ui/overlay"
import { usePopoverPositionerProps } from "./popover-positioner.context.gen"
import type { PopoverPositionerProps } from "./popover-positioner.props"

/**
 * Properties: {@link PopoverPositionerProps}
 *
 * Data attributes: {@link PopoverPositionerDataAttributes}
 *
 * @group PopoverPositioner
 */
export function usePopoverPositioner(
  element: ConnectableElement,
  props?: Partial<PopoverPositionerProps>,
): SingalState<PopoverPositionerProps> {
  const state = usePopoverPositionerProps(element, props)
  const { open, identifier, ...overlayPositionerState } = state

  useOverlayPositionerState(element, overlayPositionerState)

  useAriaAttribute(element, "aria-hidden", () => `${!open.value}`)
  useAttribute(element, "id", () => identifier.value || undefined)
  usePresence(element, open)
  useAttribute(element, "data-state", () => (open.value ? "open" : "closed"))

  return state
}

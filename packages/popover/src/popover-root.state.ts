import {
  assignProps,
  createSignal,
  mapSignals,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay"

import { openContext, triggerElementContext } from "./popover-root.context"
import {
  defaultPopoverRootProps,
  type PopoverRootProps,
} from "./popover-root.props"

/**
 * @group PopoverRoot
 */
export function usePopoverRoot(
  element: ConnectableElement,
  props?: Partial<PopoverRootProps>,
): SingalState<PopoverRootProps> {
  const state = mapSignals(assignProps(defaultPopoverRootProps, props))
  useOverlayRoot(element)

  const open = createSignal(state.defaultOpen.peek())
  const triggerElement = createSignal<HTMLElement | null>(null)

  openContext.provide(element, open)
  triggerElementContext.provide(element, triggerElement)

  return state
}

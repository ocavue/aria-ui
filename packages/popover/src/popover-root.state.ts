import {
  assignProps,
  createSignal,
  mapSignals,
  type ConnectableElement,
  type SingalState,
  useEffect,
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

  if (typeof props?.defaultOpen === "boolean") {
    state.open.value = props.defaultOpen
  }

  useEffect(element, () => {
    state.onOpenChange.value?.(state.open.value)
  })

  const triggerElement = createSignal<HTMLElement | null>(null)

  openContext.provide(element, state.open)
  triggerElementContext.provide(element, triggerElement)

  return state
}

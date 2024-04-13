import {
  assignProps,
  createSignal,
  mapSignals,
  type ConnectableElement,
  type SignalState,
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
): SignalState<PopoverRootProps> {
  const state = mapSignals(assignProps(defaultPopoverRootProps, props))
  useOverlayRoot(element)

  if (typeof props?.defaultOpen === "boolean") {
    state.open.value = props.defaultOpen
  }

  const internalOpen = createSignal(state.open.peek())

  useEffect(element, () => {
    const internalOpenValue = internalOpen.value
    state.onOpenChange.peek()?.(internalOpenValue)
  })

  const triggerElement = createSignal<HTMLElement | null>(null)

  openContext.provide(element, internalOpen)
  triggerElementContext.provide(element, triggerElement)

  useEffect(element, () => {
    state.open.value = internalOpen.value
  })
  useEffect(element, () => {
    internalOpen.value = state.open.value
  })

  return state
}

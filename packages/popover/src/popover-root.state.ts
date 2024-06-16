import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay"

import {
  onOpenChangeContext,
  openContext,
  triggerElementContext,
} from "./popover-root.context"
import {
  defaultPopoverRootProps,
  type PopoverRootProps,
} from "./popover-root.props"

/**
 * @group PopoverRoot
 * @hidden
 */
export function usePopoverRoot(
  element: ConnectableElement,
  props?: Partial<PopoverRootProps>,
): SignalState<PopoverRootProps> {
  const state = mapSignals(assignProps(defaultPopoverRootProps, props))
  useOverlayRoot(element)

  if (typeof props?.defaultOpen === "boolean") {
    state.open.set(props.defaultOpen)
  }

  const triggerElement = createSignal<HTMLElement | null>(null)

  openContext.provide(
    element,
    createComputed(() => state.open.get()),
  )
  onOpenChangeContext.provide(
    element,
    createSignal((value: boolean) => {
      state.open.set(value)
      state.onOpenChange.peek()?.(value)
    }),
  )

  triggerElementContext.provide(element, triggerElement)

  return state
}

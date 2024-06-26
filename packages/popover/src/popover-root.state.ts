import {
  createComputed,
  createSignal,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay"

import {
  onOpenChangeContext,
  openContext,
  triggerElementContext,
} from "./popover-root.context"
import type { PopoverRootProps } from "./popover-root.props"

/**
 * @group PopoverRoot
 * @hidden
 */
export function usePopoverRoot(
  element: ConnectableElement,
  state: SignalState<PopoverRootProps>,
): void {
  useOverlayRoot(element)

  state.open.set(state.defaultOpen.get())

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
}

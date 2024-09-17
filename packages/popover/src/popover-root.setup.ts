import {
  createComputed,
  createSignal,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay/elements"

import {
  onOpenChangeContext,
  openContext,
  triggerElementContext,
} from "./popover-root.context"
import type { PopoverRootEvents, PopoverRootProps } from "./popover-root.types"

/**
 * @group PopoverRoot
 * @hidden
 */
export function usePopoverRoot(
  element: ConnectableElement,
  { state, emit }: SetupOptions<PopoverRootProps, PopoverRootEvents>,
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
      emit("update:open", value)
    }),
  )

  triggerElementContext.provide(element, triggerElement)
}

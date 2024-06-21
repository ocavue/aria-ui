import {
  createSignal,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover"

import { onOpenChangeContext } from "./contexts"
import type { MenuRootProps } from "./menu-root.props"

/**
 * @group MenuRoot
 * @hidden
 */
export function useMenuRoot(
  element: ConnectableElement,
  state: SignalState<MenuRootProps>,
): void {
  usePopoverRoot(element, state)

  onOpenChangeContext.provide(
    element,
    createSignal((value: boolean) => {
      state.open.set(value)
      state.onOpenChange.peek()?.(value)
    }),
  )
}

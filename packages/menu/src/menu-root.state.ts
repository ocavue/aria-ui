import type { ConnectableElement, SignalState } from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover"

import { openContext } from "./contexts"
import type { MenuRootProps } from "./menu-root.props"

/**
 * @group MenuRoot
 * @hidden
 */
export function useMenuRoot(
  element: ConnectableElement,
  props?: Partial<MenuRootProps>,
): SignalState<MenuRootProps> {
  const state = usePopoverRoot(element, props)

  openContext.provide(element, state.open)

  return state
}

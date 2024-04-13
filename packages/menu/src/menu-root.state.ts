import type { ConnectableElement, SingalState } from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover"

import { openContext } from "./contexts"
import type { MenuRootProps } from "./menu-root.props"

/**
 * @group MenuRoot
 */
export function useMenuRoot(
  element: ConnectableElement,
  props?: Partial<MenuRootProps>,
): SingalState<MenuRootProps> {
  const state = usePopoverRoot(element, props)

  openContext.provide(element, state.open)

  return state
}

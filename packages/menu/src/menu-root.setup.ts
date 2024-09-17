import {
  createSignal,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { usePopoverRoot } from "@aria-ui/popover/elements"

import { onOpenChangeContext } from "./contexts"
import type { MenuRootEvents, MenuRootProps } from "./menu-root.types"

/**
 * @group MenuRoot
 * @hidden
 */
export function useMenuRoot(
  element: ConnectableElement,
  { state, emit }: SetupOptions<MenuRootProps, MenuRootEvents>,
): void {
  emit("update:open", true)
  usePopoverRoot(element, { state, emit })

  onOpenChangeContext.provide(
    element,
    createSignal((value: boolean) => {
      state.open.set(value)
      emit("update:open", value)
    }),
  )
}

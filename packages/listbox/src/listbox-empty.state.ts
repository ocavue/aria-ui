import {
  createComputed,
  useAriaAttribute,
  type ConnectableElement,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import { availableValueSetContext } from "./context"

/**
 * @group ListboxEmpty
 * @hidden
 */
export function useListboxEmpty(element: ConnectableElement): void {
  const availableValueSet = availableValueSetContext.consume(element)

  const presence = createComputed((): boolean => {
    return availableValueSet.get().size === 0
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return presence.get() ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return presence.get() ? undefined : "true"
  })

  usePresence(element, presence)
}

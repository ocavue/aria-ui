import {
  createComputed,
  useAriaAttribute,
  type ConnectableElement,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import { availableValueSetContext } from "./context"

/**
 * @group ListboxEmpty
 */
export function useListboxEmpty(element: ConnectableElement) {
  const availableValueSet = availableValueSetContext.consume(element)

  const presence = createComputed((): boolean => {
    return availableValueSet.value.size === 0
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return presence.value ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return presence.value ? undefined : "true"
  })

  usePresence(element, presence)
}

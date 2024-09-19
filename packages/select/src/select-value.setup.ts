import {
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"

import { selectedValueContext } from "./select-root.context"
import type { SelectValueEvents, SelectValueProps } from "./select-value.types"

/**
 * @group SelectValue
 * @hidden
 */
export function useSelectValue(
  element: ConnectableElement,
  { state }: SetupOptions<SelectValueProps, SelectValueEvents>,
): void {
  const selectedValue = selectedValueContext.consume(element)

  useEffect(element, () => {
    const text = selectedValue.get() || state.placeholder.get() || ""
    element.textContent = text
  })
}

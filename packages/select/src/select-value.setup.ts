import {
  useEffect,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"

import { selectedValueContext } from "./select-root.context"
import type { SelectValueProps } from "./select-value.types"

/**
 * @group SelectValue
 * @hidden
 */
export function useSelectValue(
  element: ConnectableElement,
  { state }: { state: SignalState<SelectValueProps> },
): void {
  const selectedValue = selectedValueContext.consume(element)

  useEffect(element, () => {
    const text = selectedValue.get() || state.placeholder.get() || ""
    element.textContent = text
  })
}

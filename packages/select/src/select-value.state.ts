import {
  assignProps,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type SignalState,
} from "@aria-ui/core"

import { selectedValueContext } from "./select-root.context"
import {
  defaultSelectValueProps,
  type SelectValueProps,
} from "./select-value.props"

/**
 * @group SelectValue
 * @hidden
 */
export function useSelectValue(
  element: ConnectableElement,
  props?: Partial<SelectValueProps>,
): SignalState<Readonly<SelectValueProps>> {
  const state = mapSignals(assignProps(defaultSelectValueProps, props))

  const selectedValue = selectedValueContext.consume(element)

  useEffect(element, () => {
    const text = selectedValue.value || state.placeholder.value || ""
    element.textContent = text
  })

  return state
}

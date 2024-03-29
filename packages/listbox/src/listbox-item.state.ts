import {
  assignProps,
  createComputed,
  mapSignals,
  setAriaRole,
  useAriaAttribute,
  useEffect,
  useEventListener,
  type ConnectableElement,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import {
  defaultListboxItemProps,
  type ListboxItemProps,
} from "./listbox-item.props"
import { handlersContext, selectedValueContext } from "./listbox.context"

/**
 * @group ListboxItem
 */
export function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
) {
  const mergedProps = assignProps(defaultListboxItemProps, props)
  const state = mapSignals(mergedProps)

  const handlers = handlersContext.consume(element)
  const selectedValue = selectedValueContext.consume(element)

  setAriaRole(element, "option")

  useEffect(element, () => handlers?.value?.onConnected?.())

  useEventListener(element, "pointerdown", () => {
    const value = state.value.value
    if (value == null) {
      return
    }
    handlers?.value?.onHighlight?.(value)
  })

  useAriaAttribute(element, "aria-selected", () => {
    const value = state.value.value
    return value && value === selectedValue?.value ? "true" : "false"
  })

  const shouldShow = createComputed((): boolean => {
    const query = state.query.value || ""
    const value = state.value.value || ""
    const filter = state.filter.value
    return filter({ query, value })
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return shouldShow.value ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return shouldShow.value ? undefined : "true"
  })

  usePresence(element, shouldShow)

  return state
}
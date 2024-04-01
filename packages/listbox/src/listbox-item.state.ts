import {
  assignProps,
  createComputed,
  mapSignals,
  useAriaAttribute,
  useEventListener,
  type ConnectableElement,
  useAttribute,
  useEffect,
  useAriaRole,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import {
  focusedValueContext,
  selectedValueContext,
} from "./listbox-item.context"
import {
  defaultListboxItemProps,
  type ListboxItemProps,
} from "./listbox-item.props"

/**
 * @group ListboxItem
 */
export function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
) {
  const state = mapSignals(assignProps(defaultListboxItemProps, props))

  const selectedValue = selectedValueContext.consume(element)
  const focusedValue = focusedValueContext.consume(element)

  useAriaRole(element, "option")

  useEventListener(element, "pointerenter", () => {
    const value = state.value.value
    if (value == null) {
      return
    }
    focusedValue.value = value
  })

  useEventListener(element, "pointerdown", () => {
    const value = state.value.value
    if (value == null) {
      return
    }
    selectedValue.value = value
  })

  const selected = createComputed(() => {
    return !!state.value.value && state.value.value === selectedValue.value
  })

  useAriaAttribute(element, "aria-selected", () => {
    return selected.value ? "true" : "false"
  })
  useAttribute(element, "data-selected", () => {
    return selected.value ? "true" : undefined
  })

  const focused = createComputed(() => {
    return !!state.value.value && state.value.value === focusedValue.value
  })

  useAttribute(element, "data-focused", () => {
    return focused.value ? "true" : undefined
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

  useEffect(element, () => {
    if (!shouldShow.value) {
      if (focused.value) {
        focusedValue.value = ""
      }
      if (selected.value) {
        selectedValue.value = ""
      }
    }
  })

  usePresence(element, shouldShow)

  return state
}

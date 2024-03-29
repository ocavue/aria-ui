import {
  createComputed,
  setAriaRole,
  useAriaAttribute,
  useEventListener,
  type ConnectableElement,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"

import { useListboxItemProps } from "./listbox-item.context.gen"
import type { ListboxItemProps } from "./listbox-item.props"

/**
 * @group ListboxItem
 */
export function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
) {
  const state = useListboxItemProps(element, props)

  setAriaRole(element, "option")

  useEventListener(element, "pointerdown", () => {
    const value = state.value.value
    if (value == null) {
      return
    }
    state.onSelect.value?.(value)
  })

  useEventListener(element, "pointerenter", () => {
    const value = state.value.value
    if (value == null) {
      return
    }
    state.onHighlight.value?.(value)
  })

  const selected = createComputed(() => {
    return (
      !!state.value.value && state.value.value === state.selectedValue.value
    )
  })

  useAriaAttribute(element, "aria-selected", () => {
    return selected.value ? "true" : "false"
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

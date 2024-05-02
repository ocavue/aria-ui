import {
  assignProps,
  createComputed,
  mapSignals,
  useAriaAttribute,
  useAriaRole,
  useAttribute,
  useEffect,
  useEventListener,
  type ConnectableElement,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"
import { nanoid } from "nanoid"

import { focusedValueContext, selectedValueContext } from "./menu-item.context"
import { defaultMenuItemProps, type MenuItemProps } from "./menu-item.props"

/**
 * @group MenuItem
 * @hidden
 */
export function useMenuItem(
  element: ConnectableElement,
  props?: Partial<MenuItemProps>,
) {
  const state = mapSignals(assignProps(defaultMenuItemProps, props))

  if (!state.value.value) {
    state.value.value = nanoid()
  }

  const focusedValue = focusedValueContext.consume(element)
  const selectedValue = selectedValueContext.consume(element)

  useAriaRole(element, "menuitem")

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

  const focused = createComputed(() => {
    return !!state.value.value && state.value.value === focusedValue.value
  })

  useAttribute(element, "data-focused", () => {
    return focused.value ? "true" : undefined
  })

  const presence = createComputed((): boolean => {
    const query = state.query.value || ""
    const value = state.value.value || ""
    const filter = state.filter.value
    return filter({ query, value })
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return presence.value ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return presence.value ? undefined : "true"
  })

  useEffect(element, () => {
    if (!presence.value) {
      if (focused.value) {
        focusedValue.value = ""
      }
    }
  })

  usePresence(element, presence)

  return state
}

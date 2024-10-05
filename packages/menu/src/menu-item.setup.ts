import {
  createComputed,
  useAriaAttribute,
  useAriaRole,
  useAttribute,
  useEffect,
  useEventListener,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { usePresence } from "@aria-ui/presence"
import { nanoid } from "nanoid"

import { focusedValueContext, selectedValueContext } from "./menu-item.context"
import type { MenuItemEvents, MenuItemProps } from "./menu-item.types"

/**
 * @group MenuItem
 * @hidden
 */
export function useMenuItem(
  element: ConnectableElement,
  { state }: SetupOptions<MenuItemProps, MenuItemEvents>,
): void {
  if (!state.value.peek()) {
    state.value.set(nanoid())
  }

  const focusedValue = focusedValueContext.consume(element)
  const selectedValue = selectedValueContext.consume(element)

  useAriaRole(element, "menuitem")

  useEventListener(element, "pointerenter", () => {
    const value = state.value.get()
    if (value == null) {
      return
    }
    focusedValue.set(value)
  })

  useEventListener(element, "pointerdown", () => {
    const value = state.value.get()
    if (value == null) {
      return
    }
    selectedValue.set(value)
  })

  const focused = createComputed(() => {
    return !!state.value.get() && state.value.get() === focusedValue.get()
  })

  useAttribute(element, "data-focused", () => {
    return focused.get() ? "true" : undefined
  })

  const presence = createComputed((): boolean => {
    const query = state.query.get() || ""
    const value = state.value.get() || ""
    const filter = state.filter.get()
    return filter({ query, value })
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return presence.get() ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return presence.get() ? undefined : "true"
  })

  useEffect(element, () => {
    if (!presence.get()) {
      if (focused.get()) {
        focusedValue.set("")
      }
    }
  })

  usePresence(element, presence)
}

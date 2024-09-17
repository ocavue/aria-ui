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

import {
  availableValueSetContext,
  focusedValueContext,
  pointerMovingContext,
  selectedValueContext,
} from "./context"
import type { ListboxItemEvents, ListboxItemProps } from "./listbox-item.types"

/**
 * @group ListboxItem
 * @hidden
 */
export function useListboxItem(
  element: ConnectableElement,
  { state }: SetupOptions<ListboxItemProps, ListboxItemEvents>,
): void {
  const selectedValue = selectedValueContext.consume(element)
  const focusedValue = focusedValueContext.consume(element)
  const pointerMoving = pointerMovingContext.consume(element)

  useAriaRole(element, "option")

  useEventListener(element, "pointerenter", () => {
    const value = state.value.get()
    const pointerMovingValue = pointerMoving.get()
    if (value == null || !pointerMovingValue) {
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

  const selected = createComputed(() => {
    return !!state.value.get() && state.value.get() === selectedValue.get()
  })

  useAriaAttribute(element, "aria-selected", () => {
    return selected.get() ? "true" : "false"
  })
  useAttribute(element, "data-selected", () => {
    return selected.get() ? "true" : undefined
  })

  const focused = createComputed(() => {
    return !!state.value.get() && state.value.get() === focusedValue.get()
  })

  useAttribute(element, "data-focused", () => {
    return focused.get() ? "true" : undefined
  })

  const availableValueSet = availableValueSetContext.consume(element)

  const presence = createComputed((): boolean => {
    return availableValueSet.get().has(state.value.get() || "")
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
      if (selected.get()) {
        selectedValue.set("")
      }
    }
  })

  usePresence(element, presence)
}

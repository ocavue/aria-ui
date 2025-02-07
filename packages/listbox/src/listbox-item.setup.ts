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
  listboxEmitterContext,
  listboxItemEmitterContext,
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
  { state, emit }: SetupOptions<ListboxItemProps, ListboxItemEvents>,
): void {
  const selectedValue = selectedValueContext.consume(element)
  const focusedValue = focusedValueContext.consume(element)
  const pointerMoving = pointerMovingContext.consume(element)
  const listboxEmitter = listboxEmitterContext.consume(element)
  const listboxItemEmitter = listboxItemEmitterContext.consume(element)

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
    if (selectedValue.get() !== value) {
      selectedValue.set(value)
    }
    emit("select", undefined)
    listboxEmitter.get()?.()
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

  // Whether if the item is visible after filtering
  const presence = createComputed((): boolean => {
    // If the availableValueSet is not set yet, we should consider the item is visible
    const availableValueSetValue = availableValueSet.get()
    if (!availableValueSetValue) {
      return true
    }
    return availableValueSetValue.has(state.value.get() || "")
  })

  useAriaAttribute(element, "aria-disabled", () => {
    return presence.get() ? undefined : "true"
  })

  useAriaAttribute(element, "aria-hidden", () => {
    return presence.get() ? undefined : "true"
  })

  // Register the emitter when the item is focused
  useEffect(element, () => {
    if (focused.get() && presence.get()) {
      listboxItemEmitter.set(() => {
        emit("select", undefined)
      })
    }
  })

  // Reset the focused and selected values when the item is hidden
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

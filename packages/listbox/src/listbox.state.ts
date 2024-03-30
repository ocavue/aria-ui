import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  setAriaRole,
  useEffect,
  useEventListener,
  useQuerySelectorAll,
  type ConnectableElement,
} from "@aria-ui/core"

import { Collection } from "./collection"
import {
  focusedValueContext,
  selectedValueContext,
} from "./listbox-item.context"
import { defaultListboxProps, type ListboxProps } from "./listbox.props"

/**
 * @group Listbox
 */
export function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
) {
  const state = mapSignals(assignProps(defaultListboxProps, props))

  setAriaRole(element, "listbox")

  const selectedValue = createSignal("")
  const focusedValue = createSignal("")

  selectedValueContext.provide(element, selectedValue)
  focusedValueContext.provide(element, focusedValue)

  const items = useQuerySelectorAll<HTMLElement>(element, '[role="option"]')
  const collection = createComputed(() => {
    return new Collection(Array.from(items.value))
  })

  useEffect(element, () => {
    element.tabIndex = 0
  })

  useEventListener(element, "focusin", (_event) => {
    console.log("focusin")
  })

  useEventListener(element, "focus", (_event) => {
    console.log("focus")
  })

  const keydownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.isComposing) {
      return
    }

    switch (event.key) {
      case "ArrowDown":
        focusedValue.value = collection.value.next(focusedValue.value) || ""
        break
      case "ArrowUp":
        focusedValue.value = collection.value.prev(focusedValue.value) || ""
        break
      case "Home":
        focusedValue.value = collection.value.first() || ""
        break
      case "End":
        focusedValue.value = collection.value.last() || ""
        break
      case "Enter":
        if (focusedValue.value) {
          selectedValue.value = focusedValue.value
        }
        break
      default:
        return
    }

    event.preventDefault()
  }

  useEffect(element, () => {
    const keydownListenerRef = state.keydownListenerRef.value
    if (keydownListenerRef) {
      keydownListenerRef(keydownListener)
      return () => keydownListenerRef(null)
    }
  })

  return state
}

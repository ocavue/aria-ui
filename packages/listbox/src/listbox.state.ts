import {
  createComputed,
  createSignal,
  setAriaRole,
  useEffect,
  useEventListener,
  useQuerySelectorAll,
  type ConnectableElement,
} from "@aria-ui/core"

import { Collection } from "./collection"
import { useListboxItemPropsProvider } from "./listbox-item.context.gen"
import { useListboxProps } from "./listbox.context.gen"
import type { ListboxProps } from "./listbox.props"

/**
 * @group Listbox
 */
export function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
) {
  const state = useListboxProps(element, props)

  setAriaRole(element, "listbox")

  const selectedValue = createSignal<string | null>(null)

  const onHighlight = createSignal((value: string) => {
    selectedValue.value = value
  })

  useListboxItemPropsProvider(element, { selectedValue, onHighlight })

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

    if (event.key === "ArrowDown") {
      selectedValue.value = collection.value.next(selectedValue.value)
    } else if (event.key === "ArrowUp") {
      selectedValue.value = collection.value.prev(selectedValue.value)
    } else if (event.key === "Home") {
      selectedValue.value = collection.value.first()
    } else if (event.key === "End") {
      selectedValue.value = collection.value.last()
    } else {
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

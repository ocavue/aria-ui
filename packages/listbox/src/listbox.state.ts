import {
  assignProps,
  createSignal,
  mapSignals,
  useEffect,
  useEventListener,
  type ConnectableElement,
  useQuerySelectorAll,
  createComputed,
  setAriaRole,
} from "@aria-ui/core"

import { Collection } from "./collection"
import {
  handlersContext,
  selectedValueContext,
  keydownHandlerContext,
  queryContext,
} from "./listbox.contexts"
import { type ListboxProps, defaultListboxProps } from "./listbox.props"

/**
 * @group Listbox
 */
export function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
) {
  const mergedProps = assignProps(defaultListboxProps, props)

  let state = mapSignals(mergedProps)
  if (!state.query.value) {
    state = {
      ...state,
      query: queryContext.consume(element),
    }
  }

  setAriaRole(element, "listbox")

  const selectedValue = createSignal<string | null>(null)

  const handlers = createSignal({
    onConnected: () => {
      // listboxItemConnected.value = true
    },
    onHighlight: (value: string) => {
      selectedValue.value = value
    },
  })

  handlersContext.provide(element, handlers)
  selectedValueContext.provide(element, selectedValue)

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

  const handleKeydown = (event: KeyboardEvent) => {
    console.log("keydown", selectedValue.value, event.key)
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

  const keydownHandler = keydownHandlerContext.consume(element)

  useEffect(element, () => {
    keydownHandler.value = handleKeydown
  })

  return state
}

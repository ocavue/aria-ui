import { Collection } from "@aria-ui/collection"
import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  useEffect,
  useQuerySelectorAll,
  type ConnectableElement,
  useAriaRole,
  type Signal,
  type ReadonlySignal,
} from "@aria-ui/core"

import {
  availableValueSetContext,
  focusedValueContext,
  selectedValueContext,
} from "./context"
import type { ListboxItemProps } from "./listbox-item.props"
import { defaultListboxProps, type ListboxProps } from "./listbox.props"

/**
 * @group Listbox
 */
export function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
) {
  const state = mapSignals(assignProps(defaultListboxProps, props))

  useAriaRole(element, "listbox")

  const focusedValue = createSignal("")

  selectedValueContext.provide(element, state.value)
  focusedValueContext.provide(element, focusedValue)

  const items = useQuerySelectorAll<HTMLElement>(element, '[role="option"]')
  const collection = createComputed(() => {
    return new Collection(Array.from(items.value))
  })

  useEffect(element, () => {
    const selected: string = state.value.value

    state.onValueChange.peek()?.(selected)

    const target = collection.peek().getElement(selected) as
      | (ListboxItemProps & HTMLElement)
      | null

    if (target?.onSelect && typeof target.onSelect === "function") {
      target.onSelect()
    }
  })

  useEffect(element, () => {
    element.tabIndex = 0
  })

  useCollectionKeydownHandler(
    element,
    collection,
    focusedValue,
    state.value,
    state.onKeydownHandlerAdd,
  )

  const availableValues = createComputed(() => {
    const queryValue = state.query.value
    const values = collection.value
      .getValues()
      .filter((value) => state.filter.value({ query: queryValue, value }))

    console.log("values", values)
    return new Set(values)
  })

  availableValueSetContext.provide(element, availableValues)

  return state
}

/**
 * @internal
 */
export function useCollectionKeydownHandler(
  element: ConnectableElement,
  collection: ReadonlySignal<Collection>,
  focusedValue: Signal<string>,
  selectedValue: Signal<string>,
  onKeydownHandlerAdd: Signal<ListboxProps["onKeydownHandlerAdd"]>,
) {
  const keydownHandler = (event: KeyboardEvent) => {
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
    const onKeydownHandlerAddValue = onKeydownHandlerAdd.value
    if (onKeydownHandlerAddValue) {
      return onKeydownHandlerAddValue(keydownHandler)
    }
    element.addEventListener("keydown", keydownHandler)
    return () => element.removeEventListener("keydown", keydownHandler)
  })
}

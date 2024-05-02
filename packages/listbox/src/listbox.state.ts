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
  useEventListener,
} from "@aria-ui/core"

import {
  availableValueSetContext,
  focusedValueContext,
  pointerMovingContext,
  selectedValueContext,
} from "./context"
import type { ListboxItemProps } from "./listbox-item.props"
import { defaultListboxProps, type ListboxProps } from "./listbox.props"

/**
 * @group Listbox
 * @hidden
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
  pointerMovingContext.provide(element, useMouseMoving(element))

  const items = useQuerySelectorAll<HTMLElement>(element, '[role="option"]')
  const collection = createComputed(() => {
    return new Collection(Array.from(items.value))
  })

  useEffect(element, () => {
    if (state.autoFocus.value) {
      focusedValue.value = collection.value.first() || ""
    }
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

  const availableValues = createComputed(() => {
    const queryValue = state.query.value
    const values = collection.value.getValues()
    const filter = state.filter.value
    const filteredValues = filter
      ? values.filter((value) => filter({ query: queryValue, value }))
      : values
    return new Set(filteredValues)
  })

  availableValueSetContext.provide(element, availableValues)

  const available = createComputed(() => availableValues.value.size > 0)

  useCollectionKeydownHandler(
    element,
    collection,
    focusedValue,
    state.value,
    state.onKeydownHandlerAdd,
    available,
  )

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
  available: Signal<boolean>,
) {
  const scrollFocusedItemIntoView = () => {
    const target = collection.peek().getElement(focusedValue.value)
    target?.scrollIntoView({ block: "nearest" })
  }

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.isComposing || !available.value) {
      return
    }

    switch (event.key) {
      case "ArrowDown":
        focusedValue.value = collection.value.next(focusedValue.value) || ""
        scrollFocusedItemIntoView()
        break
      case "ArrowUp":
        focusedValue.value = collection.value.prev(focusedValue.value) || ""
        scrollFocusedItemIntoView()
        break
      case "Home":
        focusedValue.value = collection.value.first() || ""
        scrollFocusedItemIntoView()
        break
      case "End":
        focusedValue.value = collection.value.last() || ""
        scrollFocusedItemIntoView()
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

export function useMouseMoving(element: ConnectableElement) {
  const pointerMoving = createSignal(false)
  let lastMoveMoveTime = 0

  useEventListener(element, "pointermove", () => {
    lastMoveMoveTime = Date.now()
    pointerMoving.value = true
  })

  // A simple debouncing implementation
  useEffect(element, () => {
    if (!pointerMoving.value) {
      return
    }
    const id = setInterval(() => {
      if (Date.now() - lastMoveMoveTime > 200) {
        pointerMoving.value = false
        lastMoveMoveTime = 0
      }
    }, 50)
    return () => clearInterval(id)
  })

  return pointerMoving
}

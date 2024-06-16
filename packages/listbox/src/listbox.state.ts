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
    return new Collection(Array.from(items.get()))
  })

  // Get the first value in the collection. This ensure that the effect below
  // won't run for every change in the collection.
  const firstValue = createComputed(() => {
    return collection.get().first()
  })

  // Reset the focused value to the first item when the query changes.
  useEffect(element, () => {
    if (state.autoFocus.get()) {
      state.query.get()
      focusedValue.set(firstValue.get() || "")
    }
  })

  useEffect(element, () => {
    const selected: string = state.value.get()

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
    const queryValue = state.query.get()
    const values = collection.get().getValues()
    const filter = state.filter.get()
    const filteredValues = filter
      ? values.filter((value) => filter({ query: queryValue, value }))
      : values
    return new Set(filteredValues)
  })

  availableValueSetContext.provide(element, availableValues)

  const available = createComputed(() => availableValues.get().size > 0)

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
  available: ReadonlySignal<boolean>,
) {
  const scrollFocusedItemIntoView = () => {
    const target = collection.peek().getElement(focusedValue.get())
    target?.scrollIntoView({ block: "nearest" })
  }

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.isComposing || !available.get()) {
      return
    }

    switch (event.key) {
      case "ArrowDown":
        focusedValue.set(collection.get().next(focusedValue.get()) || "")
        scrollFocusedItemIntoView()
        break
      case "ArrowUp":
        focusedValue.set(collection.get().prev(focusedValue.get()) || "")
        scrollFocusedItemIntoView()
        break
      case "Home":
        focusedValue.set(collection.get().first() || "")
        scrollFocusedItemIntoView()
        break
      case "End":
        focusedValue.set(collection.get().last() || "")
        scrollFocusedItemIntoView()
        break
      case "Enter":
        if (focusedValue.get()) {
          selectedValue.set(focusedValue.get())
        }
        break
      default:
        return
    }

    event.preventDefault()
  }

  useEffect(element, () => {
    const onKeydownHandlerAddValue = onKeydownHandlerAdd.get()
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
    pointerMoving.set(true)
  })

  // A simple debouncing implementation
  useEffect(element, () => {
    if (!pointerMoving.get()) {
      return
    }
    const id = setInterval(() => {
      if (Date.now() - lastMoveMoveTime > 200) {
        pointerMoving.set(false)
        lastMoveMoveTime = 0
      }
    }, 50)
    return () => clearInterval(id)
  })

  return pointerMoving
}

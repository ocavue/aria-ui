import { Collection } from "@aria-ui/collection"
import {
  createComputed,
  createSignal,
  useAriaRole,
  useEffect,
  useEventListener,
  useQuerySelectorAll,
  type ConnectableElement,
  type ReadonlySignal,
  type SetupOptions,
  type Signal,
  type TypedEventTarget,
} from "@aria-ui/core"

import {
  availableValueSetContext,
  focusedValueContext,
  listboxEmitterContext,
  listboxItemEmitterContext,
  pointerMovingContext,
  selectedValueContext,
} from "./context"
import type { ListboxEvents, ListboxProps } from "./listbox.types"

/**
 * @group Listbox
 * @hidden
 */
export function useListbox(
  element: ConnectableElement,
  { state, emit }: SetupOptions<ListboxProps, ListboxEvents>,
): void {
  useAriaRole(element, "listbox")

  const focusedValue = createSignal("")

  selectedValueContext.provide(element, state.value)
  focusedValueContext.provide(element, focusedValue)
  pointerMovingContext.provide(element, useMouseMoving(element))

  const listboxEmitter = createSignal(() => {
    emit("update:value", state.value.get())
  })
  listboxEmitterContext.provide(element, listboxEmitter)

  const listboxItemEmitter = createSignal<VoidFunction | null>(null)
  listboxItemEmitterContext.provide(element, listboxItemEmitter)

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
    state.eventTarget,
    available,
    listboxItemEmitter,
  )
}

/**
 * @internal
 */
export function useCollectionKeydownHandler(
  element: ConnectableElement,
  collection: ReadonlySignal<Collection>,
  focusedValue: Signal<string>,
  eventTarget: Signal<ListboxProps["eventTarget"]>,
  available: ReadonlySignal<boolean>,
  listboxItemEmitter: Signal<VoidFunction | null>,
) {
  const scrollFocusedItemIntoView = () => {
    const target = collection.peek().getElement(focusedValue.get())
    target?.scrollIntoView({ block: "nearest" })
  }

  const keydownHandler = (event: KeyboardEvent): void => {
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
        {
          const value = focusedValue.get()
          if (value) {
            listboxItemEmitter.get()?.()
          }
        }

        break
      default:
        return
    }

    event.preventDefault()
  }

  useEffect(element, () => {
    const target: TypedEventTarget<"keydown"> = eventTarget.get() || element
    target.addEventListener("keydown", keydownHandler)
    return () => target.removeEventListener("keydown", keydownHandler)
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
    // @ts-expect-error: I don't know why this `setInterval` uses the Node.js version.
    const id: number = setInterval(() => {
      if (Date.now() - lastMoveMoveTime > 200) {
        pointerMoving.set(false)
        lastMoveMoveTime = 0
      }
    }, 50)
    return () => clearInterval(id)
  })

  return pointerMoving
}

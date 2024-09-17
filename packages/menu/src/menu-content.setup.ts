import { Collection } from "@aria-ui/collection"
import {
  createComputed,
  createSignal,
  defineEmit,
  useAriaRole,
  useEffect,
  useQuerySelectorAll,
  type ConnectableElement,
  type KeyDownEventTarget,
  type ReadonlySignal,
  type SetupOptions,
  type Signal,
} from "@aria-ui/core"
import { usePopoverContent } from "@aria-ui/popover/elements"

import { onOpenChangeContext } from "./contexts"
import type { MenuContentEvents, MenuContentProps } from "./menu-content.types"
import { focusedValueContext, selectedValueContext } from "./menu-item.context"
import type { MenuItemEvents, MenuItemProps } from "./menu-item.types"

/**
 * @group MenuContent
 * @hidden
 */
export function useMenuContent(
  element: ConnectableElement,
  { state, emit }: SetupOptions<MenuContentProps, MenuContentEvents>,
): void {
  usePopoverContent(element, { state, emit })

  useAriaRole(element, "menu")

  const focusedValue = createSignal("")
  const selectedValue = createSignal("")

  selectedValueContext.provide(element, selectedValue)
  focusedValueContext.provide(element, focusedValue)
  const onOpenChange = onOpenChangeContext.consume(element)

  useEffect(element, () => {
    element.tabIndex = 0
  })

  const items = useQuerySelectorAll<HTMLElement>(element, '[role="menuitem"]')
  const collection = createComputed(() => {
    return new Collection(Array.from(items.get()))
  })

  useCollectionKeydownHandler(
    element,
    collection,
    focusedValue,
    selectedValue,
    state.eventTarget,
  )

  useSelect(element, onOpenChange, selectedValue, collection)
}

/**
 * @internal
 */
export function useCollectionKeydownHandler(
  element: ConnectableElement,
  collection: ReadonlySignal<Collection>,
  focusedValue: Signal<string>,
  selectedValue: Signal<string>,
  eventTarget: Signal<MenuContentProps["eventTarget"]>,
) {
  const keydownHandler = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.isComposing) {
      return
    }

    switch (event.key) {
      case "ArrowDown":
        focusedValue.set(collection.get().next(focusedValue.get()) || "")
        break
      case "ArrowUp":
        focusedValue.set(collection.get().prev(focusedValue.get()) || "")
        break
      case "Home":
        focusedValue.set(collection.get().first() || "")
        break
      case "End":
        focusedValue.set(collection.get().last() || "")
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
    const target: KeyDownEventTarget = eventTarget.get() || element
    target.addEventListener("keydown", keydownHandler)
    return () => target.removeEventListener("keydown", keydownHandler)
  })
}

function useSelect(
  element: ConnectableElement,
  onOpenChange: ReadonlySignal<((open: boolean) => void) | null>,
  selectedValue: ReadonlySignal<string>,
  collection: ReadonlySignal<Collection>,
) {
  useEffect(element, () => {
    const value = selectedValue.get()
    if (!value) return

    const target = collection.peek().getElement(value) as
      | (HTMLElement & MenuItemProps)
      | null
    if (!target) return

    const emit = defineEmit<MenuItemEvents>(target, { select: {} })
    emit("select")
    onOpenChange.peek()?.(false)
  })
}

import { Collection } from "@aria-ui/collection"
import {
  createComputed,
  createSignal,
  useAriaRole,
  useEffect,
  useQuerySelectorAll,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
  type SignalState,
} from "@aria-ui/core"
import { usePopoverContent } from "@aria-ui/popover"

import { openContext } from "./contexts"
import {
  defaultMenuContentProps,
  type MenuContentProps,
} from "./menu-content.props"
import { focusedValueContext, selectedValueContext } from "./menu-item.context"
import type { MenuItemProps } from "./menu-item.props"

/**
 * @group MenuContent
 * @hidden
 */
export function useMenuContent(
  element: ConnectableElement,
  props?: Partial<MenuContentProps>,
) {
  const popoverState = usePopoverContent(element, props)

  const state: SignalState<MenuContentProps> = {
    ...popoverState,
    onKeydownHandlerAdd: createSignal<MenuContentProps["onKeydownHandlerAdd"]>(
      props?.onKeydownHandlerAdd ?? defaultMenuContentProps.onKeydownHandlerAdd,
    ),
  }

  useAriaRole(element, "menu")

  const focusedValue = createSignal("")
  const selectedValue = createSignal("")

  selectedValueContext.provide(element, selectedValue)
  focusedValueContext.provide(element, focusedValue)
  const open = openContext.consume(element)

  useEffect(element, () => {
    element.tabIndex = 0
  })

  const items = useQuerySelectorAll<HTMLElement>(element, '[role="menuitem"]')
  const collection = createComputed(() => {
    return new Collection(Array.from(items.value))
  })

  useCollectionKeydownHandler(
    element,
    collection,
    focusedValue,
    selectedValue,
    state.onKeydownHandlerAdd,
  )

  useSelect(element, open, selectedValue, collection)

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
  onKeydownHandlerAdd: Signal<MenuContentProps["onKeydownHandlerAdd"]>,
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

function useSelect(
  element: ConnectableElement,
  open: Signal<boolean>,
  selectedValue: ReadonlySignal<string>,
  collection: ReadonlySignal<Collection>,
) {
  useEffect(element, () => {
    const value = selectedValue.value
    if (!value) return

    const target = collection.peek().getElement(value) as
      | (HTMLElement & MenuItemProps)
      | null
    if (!target) return

    if (target.onSelect && typeof target.onSelect === "function") {
      target.onSelect()
      open.value = false
    }
  })
}

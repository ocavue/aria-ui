import {
  createSignal,
  useAriaRole,
  useEffect,
  useQuerySelector,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"
import { getEventTarget } from "@zag-js/dom-query"

import { inputValueContext } from "./combobox-item.context"
import { keydownHandlerContext } from "./combobox-list.context"

function useInputValue(element: ConnectableElement): ReadonlySignal<string> {
  const input = useQuerySelector<HTMLInputElement>(element, "input")

  const inputValue = createSignal("")

  useEffect(element, () => {
    const inputElement = input.get()

    if (!inputElement) {
      return
    }

    const handler = (event: Event) => {
      const target = getEventTarget<HTMLInputElement>(event)
      if (!target) {
        return
      }
      inputValue.set(target.value)
    }

    inputElement.addEventListener("input", handler)
    return () => inputElement.removeEventListener("input", handler)
  })

  return inputValue
}

export function useKeyboardListener(element: ConnectableElement) {
  const keydownHandler = createSignal<((event: KeyboardEvent) => void) | null>(
    null,
  )

  useEffect(element, () => {
    const keydownHandlerValue = keydownHandler.get()

    if (keydownHandlerValue) {
      element.addEventListener("keydown", keydownHandlerValue)
      return () => element.removeEventListener("keydown", keydownHandlerValue)
    }
  })

  return keydownHandler
}

/**
 * @group ComboboxRoot
 * @hidden
 */
export function useComboboxRoot(element: ConnectableElement) {
  useAriaRole(element, "combobox")

  const inputValue = useInputValue(element)
  inputValueContext.provide(element, inputValue)

  const keydownHandler = useKeyboardListener(element)
  keydownHandlerContext.provide(element, keydownHandler)
  return {}
}

import {
  createSignal,
  useAriaRole,
  useEffect,
  useQuerySelector,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"

import { inputValueContext } from "./combobox-item.context"
import { keydownHandlerContext } from "./combobox-list.context"

function useInputValue(element: ConnectableElement): ReadonlySignal<string> {
  const input = useQuerySelector<HTMLInputElement>(element, "input")

  const inputValue = createSignal("")

  useEffect(element, () => {
    const inputElement = input.value

    if (!inputElement) {
      return
    }

    const handler = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      if (!target) {
        return
      }
      inputValue.value = target.value
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
    const keydownHandlerValue = keydownHandler.value

    if (keydownHandlerValue) {
      element.addEventListener("keydown", keydownHandlerValue)
      return () => element.removeEventListener("keydown", keydownHandlerValue)
    }
  })

  return keydownHandler
}

/**
 * @group ComboboxRoot
 */
export function useComboboxRoot(element: ConnectableElement) {
  useAriaRole(element, () => "combobox")

  const inputValue = useInputValue(element)
  inputValueContext.provide(element, inputValue)

  const keydownHandler = useKeyboardListener(element)
  keydownHandlerContext.provide(element, keydownHandler)
}

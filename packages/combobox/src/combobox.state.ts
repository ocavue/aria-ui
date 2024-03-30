import {
  createSignal,
  setAriaRole,
  useEffect,
  useQuerySelector,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"

import { inputValueContext } from "./combobox-item.context"
import { keydownListenerContext } from "./combobox-list.context"

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
  const keydownListener = createSignal<((event: KeyboardEvent) => void) | null>(
    null,
  )

  useEffect(element, () => {
    const keydownListenerValue = keydownListener.value

    if (keydownListenerValue) {
      element.addEventListener("keydown", keydownListenerValue)
      return () => element.removeEventListener("keydown", keydownListenerValue)
    }
  })

  return keydownListener
}

/**
 * @group Combobox
 */
export function useCombobox(element: ConnectableElement) {
  setAriaRole(element, "combobox")

  const inputValue = useInputValue(element)
  inputValueContext.provide(element, inputValue)

  const keydownListener = useKeyboardListener(element)
  keydownListenerContext.provide(element, keydownListener)
}

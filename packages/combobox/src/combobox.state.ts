import {
  createSignal,
  useEffect,
  useQuerySelector,
  type ConnectableElement,
  type ReadonlySignal,
  setAriaRole,
} from "@aria-ui/core"
import {
  useListboxItemPropsProvider,
  useListboxPropsProvider,
  type ListboxProps,
} from "@aria-ui/listbox"

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

  const keydownListenerRef = createSignal<ListboxProps["keydownListenerRef"]>(
    (value) => {
      keydownListener.value = value
    },
  )

  return keydownListenerRef
}

/**
 * @group Combobox
 */
export function useCombobox(element: ConnectableElement) {
  setAriaRole(element, "combobox")

  const query = useInputValue(element)
  const keydownListenerRef = useKeyboardListener(element)

  useListboxItemPropsProvider(element, { query })
  useListboxPropsProvider(element, { keydownListenerRef })
}

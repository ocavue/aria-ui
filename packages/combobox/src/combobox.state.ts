import {
  createSignal,
  useEffect,
  useQuerySelector,
  type ConnectableElement,
  type ReadonlySignal,
  setAriaRole,
} from "@aria-ui/core"

import { queryContext, rootContext } from "./combobox.context"

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

/**
 * @group Combobox
 */
export function useCombobox(element: ConnectableElement) {
  setAriaRole(element, "combobox")

  const inputValue = useInputValue(element)
  queryContext.provide(element, inputValue)

  rootContext.provide(element, createSignal(element))
}

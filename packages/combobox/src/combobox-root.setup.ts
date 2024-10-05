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
import { eventTargetContext } from "./combobox-list.context"

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

/**
 * @group ComboboxRoot
 * @hidden
 */
export function useComboboxRoot(element: ConnectableElement): void {
  useAriaRole(element, "combobox")

  const inputValue = useInputValue(element)
  inputValueContext.provide(element, inputValue)

  const eventTarget = createSignal<HTMLElement | undefined>(undefined)
  useEffect(element, () => {
    eventTarget.set(element)
    return () => eventTarget.set(undefined)
  })

  eventTargetContext.provide(element, eventTarget)
}

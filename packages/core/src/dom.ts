import type { AriaAttributes } from "@dddstack/ariatype-aria-attributes"
import type { AriaRole } from "@dddstack/ariatype-aria-roles"

import type { ConnectableElement } from "./connectable-element"
import {
  createComputed,
  createSignal,
  useEffect,
  type ReadonlySignal,
} from "./signals"

/**
 * @group DOM
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): VoidFunction {
  return useEffect(element, () => {
    element.addEventListener(type, listener, options)
    return () => {
      element.removeEventListener(type, listener, options)
    }
  })
}

/**
 * @group DOM
 */
export function useStyle<K extends keyof CSSStyleDeclaration>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): VoidFunction {
  return useEffect(element, () => {
    element.style[key] = compute()
  })
}

/**
 * @group DOM
 */
export function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => string | number | undefined,
): VoidFunction {
  return useEffect(element, () => {
    const value = compute()
    if (value == null) {
      element.removeAttribute(key)
    } else {
      element.setAttribute(key, String(value))
    }
  })
}

/**
 * @group DOM
 */
export function useAriaAttribute<K extends keyof AriaAttributes>(
  element: ConnectableElement,
  key: K,
  compute: () => AriaAttributes[K],
): VoidFunction {
  return useAttribute(element, key, compute)
}

/**
 * Set the `role` attribute of the element when it's connected.
 *
 * You can pass a string or a compute function that returns a string.
 *
 * @group DOM
 */
export function useAriaRole(
  element: ConnectableElement,
  role: AriaRole | (() => AriaRole | undefined),
): VoidFunction {
  const compute = typeof role === "string" ? () => role : role
  return useAttribute(element, "role", compute)
}

function useMutationObserver(
  element: ConnectableElement,
  options: MutationObserverInit,
) {
  const mutationCounter = createSignal(1)

  useEffect(element, () => {
    const observer = new MutationObserver((mutationList) => {
      if (mutationList.length > 0) {
        mutationCounter.value += 1
      }
    })

    observer.observe(element, options)

    return () => {
      observer.disconnect()
    }
  })

  return mutationCounter
}

/**
 * @group DOM
 */
export function useQuerySelector<E extends Element = Element>(
  element: ConnectableElement,
  selector: string,
): ReadonlySignal<E | null> {
  const mutationCounter = useMutationObserver(element, {
    childList: true,
  })

  return createComputed(() => {
    mutationCounter.value
    return element.querySelector<E>(selector)
  })
}

/**
 * @group DOM
 */
export function useQuerySelectorAll<E extends Element = Element>(
  element: ConnectableElement,
  selector: string,
): ReadonlySignal<NodeListOf<E>> {
  const mutationCounter = useMutationObserver(element, {
    childList: true,
  })

  return createComputed(() => {
    mutationCounter.value
    return element.querySelectorAll<E>(selector)
  })
}

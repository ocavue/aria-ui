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
 * Registers an event listener on the element.
 *
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
 * Sets the computed style of the element when it's connected.
 *
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
 * Sets the computed attribute of the element when it's connected.
 *
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
 * Sets the computed attribute of the element when it's connected.
 *
 * This is a TypeScript type-safe version of {@link useAttribute}.
 *
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
 * Sets the `role` attribute of the element when it's connected.
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

/**
 * Returns a signal that changes when the mutation observer detects a change in
 * the element.
 */
function useMutationObserver(
  element: ConnectableElement,
  options: MutationObserverInit,
) {
  const mutationCounter = createSignal(1)

  useEffect(element, () => {
    const observer = new MutationObserver((mutationList) => {
      if (mutationList.length > 0) {
        mutationCounter.set(mutationCounter.get() + 1)
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
 * Returns the first element matching the given selector.
 *
 * @group DOM
 */
export function useQuerySelector<E extends Element = Element>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit = {
    attributeFilter: ["aria-hidden", "aria-selected", "aria-disabled"],
    childList: true,
    subtree: true,
  },
): ReadonlySignal<E | null> {
  const mutationCounter = useMutationObserver(element, options)

  return createComputed(() => {
    mutationCounter.get()
    return element.querySelector<E>(selector)
  })
}

/**
 * Returns all elements matching the given selector.
 *
 * @group DOM
 */
export function useQuerySelectorAll<E extends Element = Element>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit = {
    attributeFilter: ["aria-hidden", "aria-selected", "aria-disabled"],
    childList: true,
    subtree: true,
  },
): ReadonlySignal<NodeListOf<E>> {
  const mutationCounter = useMutationObserver(element, options)

  return createComputed(() => {
    mutationCounter.get()
    return element.querySelectorAll<E>(selector)
  })
}

/**
 *
 * Executes an effect in the next animation frame.
 *
 * The given `effect` function will be called when the element is connected, and
 * when the dependencies change afterward.
 *
 * `effect` could return a function `callback`. `callback` will be called in the
 * next animation frame.
 *
 * `callback` could return a function `dispose`. `dispose` will be called when
 * the effect is disposed.
 *
 * @group DOM
 */
export function useAnimationFrame(
  element: ConnectableElement,
  effect: () => (() => void | VoidFunction) | void,
) {
  return useEffect(element, () => {
    const callback = effect()

    if (!callback) {
      return
    }

    let dispose: VoidFunction | undefined = undefined

    const id = requestAnimationFrame(() => {
      dispose?.()
      dispose = callback() || undefined
    })
    return () => {
      cancelAnimationFrame(id)
      dispose?.()
      dispose = undefined
    }
  })
}

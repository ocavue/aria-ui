import type { AriaAttributes } from "@dddstack/ariatype-aria-attributes"
import type { AriaRole } from "@dddstack/ariatype-aria-roles"

import type { ConnectableElement } from "./connectable-element"
import { useEffect } from "./signals"

/**
 * @group DOM
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(element, () => {
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
) {
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
) {
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
) {
  return useAttribute(element, key, compute)
}

/**
 * @group DOM
 */
export function useAriaRole(
  element: ConnectableElement,
  compute: () => AriaRole | undefined,
) {
  return useAttribute(element, "role", compute)
}

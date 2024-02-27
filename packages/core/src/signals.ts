import {
  batch as _batch,
  untracked as _untracked,
  computed,
  effect,
  signal,
  type ReadonlySignal,
  type Signal,
} from "@preact/signals-core"

import type { ConnectableElement } from "./connectable-element"

export type { ReadonlySignal, Signal }

/**
 * Creates a new signal with the given initial value.
 *
 * This is an alias for `signal` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const createSignal = signal

/**
 * Creates a new signal that is computed based on the values of other signals.
 *
 * This is an alias for `computed` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const createComputed = computed

/**
 * A re-export of `batch` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const batch = _batch

/**
 * A re-export of `untracked` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const untracked = _untracked

/**
 * Registers a callback to be called when the given element is connected to the
 * DOM. It will track which signals are accessed and re-run their callback when
 * those signals change. The callback can return a cleanup function that will be
 * called when the effect is destroyed.
 *
 * The effect will be destroyed and all signals it was subscribed to will be
 * unsubscribed from, when the element is disconnected from the DOM. You can also
 * manually destroy the effect by calling the returned function.
 *
 * @group Signals
 */
export function useEffect(
  element: ConnectableElement,
  callback: () => VoidFunction | void,
) {
  let cleanup: VoidFunction | undefined = undefined

  const dispose = (): void => {
    cleanup?.()
    cleanup = undefined
  }

  element.addConnectedCallback((): VoidFunction => {
    cleanup?.()
    cleanup = effect(callback)
    return dispose
  })

  return dispose
}

/**
 * Extracts the value type from a signal type.
 *
 * @group Signals
 */
export type SignalValue<S> = S extends Signal<infer T> ? T : never

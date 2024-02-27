import {
  batch as _batch,
  untracked as _untracked,
  computed,
  effect,
  signal,
  type ReadonlySignal as _ReadonlySignal,
  type Signal as _Signal,
} from "@preact/signals-core"

import type { ConnectableElement } from "./connectable-element"

/**
 * A mutable signal that can be used to manage reactive state changes.
 *
 * This is a re-export of `Signal` type from `@preact/signals-core`.
 *
 * @group Signals
 */
export type Signal<T> = _Signal<T>

/**
 * A read-only signal, providing a way to observe state changes without the
 * ability to modify the state.
 *
 * This is a re-export of `ReadonlySignal` type from `@preact/signals-core`.
 *
 * @group Signals
 */
export type ReadonlySignal<T> = _ReadonlySignal<T>

/**
 * Groups multiple signal updates into a single batch, optimizing performance by reducing the number of updates.
 *
 * This is a re-export of `batch` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const batch = _batch

/**
 * Executes a given computation without automatically tracking its dependencies,
 * useful for avoiding unnecessary re-computations.
 *
 * This is a re-export of `untracked` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const untracked = _untracked

/**
 * Creates and returns a new signal with the given initial value. Signals are
 * reactive data sources that can be read and written to, allowing components to
 * reactively update when their values change.
 *
 * This is an alias for `signal` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const createSignal = signal

/**
 * Creates a computed signal that automatically updates its value based on the
 * reactive dependencies it uses. Computed signals are read-only and are used to
 * derive state from other signals, recalculating their value when dependencies
 * change.
 *
 * This is an alias for `computed` from `@preact/signals-core`.
 *
 * @group Signals
 */
export const createComputed = computed

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

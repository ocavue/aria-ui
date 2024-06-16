import {
  batch as _batch,
  untracked as _untracked,
  computed,
  effect,
  signal,
  type Signal as PreactSignal,
} from "@preact/signals-core"

import type { ConnectableElement } from "./connectable-element"

/**
 * A read-only signal that holds a reactive value.
 */
export interface ReadonlySignal<T> {
  /**
   * Get the signal's current value.
   */
  get(): T

  /**
   * Get the signal's current value without subscribing.
   */
  peek(): T

  value: T
}

/**
 * A mutable signal that can be used to manage reactive state changes.
 */
export interface Signal<T> extends ReadonlySignal<T> {
  /**
   * Set the value of the signal.
   */
  set(value: T): void

  value: T
}

class MutableSignal<T> implements Signal<T> {
  private readonly impl: PreactSignal<T>

  constructor(value: T) {
    this.impl = signal(value)
  }

  get value(): T {
    return this.impl.value
  }

  set value(value: T) {
    this.impl.value = value
  }

  get(): T {
    return this.impl.value
  }

  set(value: T): void {
    this.impl.value = value
  }

  peek(): T {
    return this.impl.peek()
  }
}

class ComputedSignal<T> implements ReadonlySignal<T> {
  private readonly impl: PreactSignal<T>

  constructor(fn: () => T) {
    this.impl = computed(fn)
  }

  get value(): T {
    return this.impl.value
  }

  get(): T {
    return this.impl.value
  }

  peek(): T {
    return this.impl.peek()
  }
}

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
 * @group Signals
 */
export function createSignal<T>(value: T): Signal<T> {
  return new MutableSignal(value)
}

/**
 * Creates a computed signal that automatically updates its value based on the
 * reactive dependencies it uses. Computed signals are read-only and are used to
 * derive state from other signals, recalculating their value when dependencies
 * change.
 *
 * @group Signals
 */
export function createComputed<T>(fn: () => T): ReadonlySignal<T> {
  return new ComputedSignal(fn)
}

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

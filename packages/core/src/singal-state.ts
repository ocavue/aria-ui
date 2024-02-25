import type { Signal } from "@preact/signals-core"
import { signal } from "@preact/signals-core"

import { getObjectEntries } from "./types"

export type SingalState<T extends object> = {
  [K in keyof T]: Signal<T[K]>
}

/**
 * Maps every signal in the given object to its current value.
 */
export function mapValues<T extends object>(signals: SingalState<T>): T {
  const values = {} as T
  for (const [key, signal] of getObjectEntries(signals)) {
    values[key] = signal.value
  }
  return values
}

/**
 * Maps every value in the given object to a signal.
 */
export function mapSignals<T extends object>(values: T): SingalState<T> {
  const signals = {} as SingalState<T>
  for (const [key, value] of getObjectEntries(values)) {
    signals[key] = signal(value)
  }
  return signals
}

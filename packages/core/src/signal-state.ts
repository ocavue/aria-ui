import type { PropDeclarations } from "./prop"
import { createSignal, type Signal } from "./signals"
import { getObjectEntries } from "./types"

/**
 * A plain object containing signals.
 *
 * @group Props and States
 */
export type SignalState<T extends object> = {
  [K in keyof Required<T>]: Signal<T[K]>
}

/**
 * Maps every signal in the given object to its current value.
 *
 * @group Props and States
 *
 * @deprecated
 */
export function mapValues<T extends object>(signals: SignalState<T>): T {
  const values = {} as T
  for (const [key, signal] of getObjectEntries(signals)) {
    values[key] = signal.get()
  }
  return values
}

/**
 * Maps every value in the given object to a signal.
 *
 * @group Props and States
 *
 * @deprecated
 */
export function mapSignals<T extends object>(values: T): SignalState<T> {
  const signals = {} as SignalState<T>
  for (const [key, value] of getObjectEntries(values)) {
    signals[key] = createSignal(value)
  }
  return signals
}

export function getStateFromProps<Props extends object>(
  props: PropDeclarations<Props>,
): SignalState<Props> {
  const state = {} as SignalState<Props>
  for (const [key, prop] of getObjectEntries(props)) {
    state[key] = createSignal(prop.default)
  }
  return state
}

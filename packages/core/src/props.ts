import type { ConnectableElement } from "./connectable-element"
import type { Context } from "./context"
import {
  createComputed,
  useEffect,
  type ReadonlySignal,
  type Signal,
} from "./signals"
import { mapSignals, mapValues, type SingalState } from "./singal-state"
import { getObjectEntries, getObjectKeys } from "./types"

/**
 * Merges two objects, with the second object taking precedence. Only keys
 * present in the first object will be included in the result.
 */
function assignProps<T extends object>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T> {
  if (!props) {
    return defaultProps
  }

  const merged: T = { ...defaultProps }
  for (const key of getObjectKeys(defaultProps)) {
    const prop = props[key] as T[keyof T] | undefined
    if (prop !== undefined) {
      merged[key] = prop
    }
  }
  return merged
}

/**
 * Provides some props to any child element that is connected to a context.
 *
 * @internal
 */
export function usePropsProvider<Props extends object>(
  element: ConnectableElement,
  context: Context<Partial<Props>>,
  state: SingalState<Partial<Props>>,
): void {
  const consumed: Signal<Partial<Props>> = context.consume(element)
  const merged: ReadonlySignal<Partial<Props>> = createComputed(() => {
    return {
      ...consumed.value,
      ...mapValues(state),
    }
  })
  context.provide(element, merged)
}

/**
 * Returns a signal state object that merges the default props, the provided
 * props, and the values from the context.
 *
 * @internal
 */
export function useProps<Props extends object>(
  element: ConnectableElement,
  context: Context<Partial<Props>>,
  defaultProps: Props,
  props?: Partial<Props>,
): SingalState<Props> {
  const state = mapSignals(assignProps(defaultProps, props))
  const consumed: Signal<Partial<Props>> = context.consume(element)

  useEffect(element, () => {
    const values = consumed.value
    for (const [key, value] of getObjectEntries(values)) {
      if (value !== undefined) {
        state[key].value = value as Props[keyof Props]
      }
    }
  })

  return state
}

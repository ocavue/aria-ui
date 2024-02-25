import {
  type ReadonlySignal,
  type Signal,
  batch,
  computed,
  effect,
  signal,
  untracked,
} from "@preact/signals-core"
import type { ConnectableElement } from "./connectable-element"

export type { Signal, ReadonlySignal }
export { signal as createSignal, computed as createComputed, batch, untracked }

export function useEffect(
  element: ConnectableElement,
  callback: (() => VoidFunction) | (() => void),
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

export type SignalValue<S> = S extends Signal<infer T> ? T : never

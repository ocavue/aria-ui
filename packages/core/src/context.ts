import { effect } from "@preact/signals-core"
import { getEventTarget } from "@zag-js/dom-query"

import type { ConnectableElement } from "./connectable-element"
import { createSignal, type ReadonlySignal, type Signal } from "./signals"

class ContextRequestEvent<T> extends Event {
  public constructor(
    public readonly key: string | symbol,
    public readonly callback: (signal: Signal<T>) => void,
  ) {
    super("aria-ui/context-request", { bubbles: true, composed: true })
  }
}

/**
 * A context is a way to provide and consume signals in a HTML tree.
 *
 * @group Contexts
 */
export interface Context<T> {
  /**
   * Provides a signal to all children of the element.
   * @param element The element to provide the signal to.
   * @param signal The signal to provide.
   */
  provide(
    element: ConnectableElement,
    signal: Signal<T> | ReadonlySignal<T>,
  ): void

  /**
   * Receives the signal from a parent element.
   * @param element The element to consume the signal from.
   * @returns A signal that is double-bound to the provided signal.
   */
  consume(element: ConnectableElement): Signal<T>
}

class ContextImpl<T> implements Context<T> {
  public constructor(
    private readonly key: string | symbol,
    private readonly defaultValue: T,
  ) {
    this.provide = this.provide.bind(this)
    this.consume = this.consume.bind(this)
  }

  public provide(element: ConnectableElement, signal: Signal<T>): void {
    element.addEventListener("aria-ui/context-request", (event) => {
      // Don't consume the event if it's dispatched from the same element.
      if (element === getEventTarget(event)) {
        return
      }

      const { key, callback } = event as ContextRequestEvent<T>
      if (key === this.key) {
        callback(signal)
        event.stopPropagation()
      }
    })
  }

  public consume(element: ConnectableElement): Signal<T> {
    const consumer = createSignal(this.defaultValue)
    let dispose: VoidFunction | undefined
    let provider: Signal<T> | undefined

    element.addConnectedCallback(() => {
      element.dispatchEvent(
        new ContextRequestEvent<T>(this.key, (contextProvider) => {
          dispose?.()
          dispose = effect(() => {
            consumer.set(contextProvider.get())
          })
          provider = contextProvider
        }),
      )
      return () => {
        dispose?.()
        dispose = undefined
        provider = undefined
      }
    })

    const peek = () => {
      return consumer.peek()
    }

    const get = () => {
      return consumer.get()
    }

    const set = (value: T) => {
      provider?.set(value)
    }

    return {
      get,

      /**
       * @deprecated
       */
      get value() {
        return get()
      },

      set,

      /**
       * @deprecated
       */
      set value(value: T) {
        set(value)
      },

      peek,
    }
  }
}

/**
 * Creates a new context.
 *
 * @param key The key to use for the context.
 * @param defaultValue The default value to return if the signal is not provided.
 *
 * @group Contexts
 */
export function createContext<T>(
  key: string | symbol,
  defaultValue: T,
): Context<T> {
  return new ContextImpl<T>(
    typeof key === "string" ? `aria-ui/context/${key}` : key,
    defaultValue,
  )
}

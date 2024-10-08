import { effect } from "@preact/signals-core"
import { getDocumentElement, getEventTarget } from "@zag-js/dom-query"

import type { ConnectableElement } from "./connectable-element"
import { createSignal, type ReadonlySignal, type Signal } from "./signals"

type ContextCallback<T> = (signal: Signal<T>) => void

class ContextRequestEvent<T> extends Event {
  public constructor(
    public readonly key: string | symbol,
    public readonly callback: ContextCallback<T>,
  ) {
    super("aria-ui/context-request", { bubbles: true, composed: true })
  }
}

export class ContextProviderEvent extends Event {
  constructor(public readonly key: string | symbol) {
    super("aria-ui/context-provider", { bubbles: true, composed: true })
  }
}

declare global {
  interface HTMLElementEventMap {
    "aria-ui/context-request": ContextRequestEvent<unknown>
    "aria-ui/context-provider": ContextProviderEvent
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
    const consumers = new Map<(signal: Signal<unknown>) => void, EventTarget>()

    const handleRequest = (event: ContextRequestEvent<unknown>) => {
      const consumer = getEventTarget(event)

      if (
        // Don't consume the event if it's dispatched from the same element.
        element === consumer ||
        event.key !== this.key ||
        consumers.has(event.callback) ||
        !consumer
      ) {
        return
      }

      event.stopPropagation()
      event.callback(signal)
      consumers.set(event.callback, consumer)
    }

    /**
     * When we get a provider request event, that means a child of this element
     * has just woken up. If it's a provider of our context, then we may need to
     * re-parent our subscriptions, because is a more specific provider than us
     * for its subtree.
     */
    const handleProvider = (event: ContextProviderEvent) => {
      const provider = getEventTarget(event)

      if (
        // Don't consume the event if it's dispatched from the same element.
        element === provider ||
        event.key !== this.key ||
        !provider
      ) {
        return
      }

      event.stopPropagation()

      // Re-parent all of our subscriptions in case this new child provider
      // should take them over.
      const previousConsumers = Array.from(consumers.entries())
      consumers.clear()

      for (const [callback, consumer] of previousConsumers) {
        consumer.dispatchEvent(new ContextRequestEvent<T>(this.key, callback))
      }
    }

    element.addConnectedCallback(() => {
      ensureAttachRoot(getDocumentElement(element))

      element.addEventListener("aria-ui/context-request", handleRequest)
      element.addEventListener("aria-ui/context-provider", handleProvider)
      element.dispatchEvent(new ContextProviderEvent(this.key))

      return () => {
        element.removeEventListener("aria-ui/context-request", handleRequest)
        element.removeEventListener("aria-ui/context-provider", handleProvider)
      }
    })
  }

  public consume(element: ConnectableElement): Signal<T> {
    const consumer = createSignal(this.defaultValue)
    let dispose: VoidFunction | undefined
    let provider: Signal<T> | undefined
    let pending: T | undefined

    element.addConnectedCallback(() => {
      ensureAttachRoot(getDocumentElement(element))

      const onRequest: ContextCallback<T> = (contextProvider: Signal<T>) => {
        dispose?.()
        dispose = effect(() => {
          consumer.set(contextProvider.get())
        })
        provider = contextProvider

        if (pending !== undefined) {
          contextProvider.set(pending)
          pending = undefined
        }
      }

      element.dispatchEvent(new ContextRequestEvent(this.key, onRequest))

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
      if (provider) {
        provider.set(value)
      } else {
        pending = value
      }
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

const attachedRoots = new WeakSet<HTMLElement>()

function ensureAttachRoot(root: HTMLElement) {
  if (attachedRoots.has(root)) {
    return
  }

  attachedRoots.add(root)
  attachRoot(root)
}

/**
 * Gathers unsatisfied context requests and re-dispatch them when new providers
 * which satisfy matching context keys are available.
 *
 * This allows providers to be added to a DOM tree, or upgraded, after the
 * consumers.
 */
function attachRoot(element: HTMLElement) {
  interface PendingRequests {
    callbacks: WeakMap<HTMLElement, WeakSet<ContextCallback<unknown>>>
    requests: Array<{
      elementRef: WeakRef<HTMLElement>
      callbackRef: WeakRef<ContextCallback<unknown>>
    }>
  }

  const store = new Map<string | symbol, PendingRequests>()

  const popPendingRequests = (key: string | symbol): PendingRequests | void => {
    const pendingRequestData = store.get(key)
    if (pendingRequestData === undefined) {
      return
    }
    store.delete(key)
    return pendingRequestData
  }

  const getPendingRequests = (key: string | symbol): PendingRequests => {
    let pendingRequestData = store.get(key)
    if (pendingRequestData === undefined) {
      pendingRequestData = {
        callbacks: new WeakMap(),
        requests: [],
      }
      store.set(key, pendingRequestData)
    }
    return pendingRequestData
  }

  const onContextProvider = (event: ContextProviderEvent) => {
    const pendingRequestData = popPendingRequests(event.key)
    if (pendingRequestData === undefined) {
      // No pending requests for this context at this time
      return
    }

    // Loop over all pending requests and re-dispatch them from their source
    const { requests } = pendingRequestData
    for (const { elementRef, callbackRef } of requests) {
      const element = elementRef.deref()
      const callback = callbackRef.deref()

      if (element === undefined || callback === undefined) {
        // The element was GC'ed. Do nothing.
      } else {
        // Re-dispatch if we still have the element and callback
        element.dispatchEvent(new ContextRequestEvent(event.key, callback))
      }
    }
  }

  const onContextRequest = (event: ContextRequestEvent<unknown>) => {
    const element = getEventTarget<HTMLElement>(event)
    if (!element) {
      return
    }

    const callback = event.callback

    const pendingRequestData = getPendingRequests(event.key)

    let callbacks = pendingRequestData.callbacks.get(element)
    if (callbacks === undefined) {
      callbacks = new WeakSet()
      pendingRequestData.callbacks.set(element, callbacks)
    }

    if (callbacks.has(callback)) {
      // We're already tracking this element/callback pair
      return
    }

    callbacks.add(callback)
    pendingRequestData.requests.push({
      elementRef: new WeakRef(element),
      callbackRef: new WeakRef(callback),
    })
  }

  element.addEventListener("aria-ui/context-request", onContextRequest)
  element.addEventListener("aria-ui/context-provider", onContextProvider)
}

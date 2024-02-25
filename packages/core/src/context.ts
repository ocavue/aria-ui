import type { ConnectableElement } from "./connectable-element"
import type { Signal } from "./signals"

class ContextRequestEvent<S extends Signal> extends Event {
  public constructor(
    public readonly key: string | symbol,
    public readonly callback: (singal: S) => void,
  ) {
    super("aria-ui/context-request", { bubbles: true, composed: true })
  }
}

/**
 * A context is a way to provide and consume signals in a HTML tree.
 */
export interface Context<S extends Signal> {
  /**
   * Provides a signal to all children of the element.
   * @param element The element to provide the signal to.
   * @param signal The signal to provide.
   */
  provide(element: ConnectableElement, signal: S): void
  /**
   * Receives the signal from a parent element.
   * @param element The element to consume the signal from.
   * @returns The signal or undefined if the signal is not provided.
   */
  consume(element: ConnectableElement): S | undefined
}

class ContextImpl<S extends Signal> implements Context<S> {
  public constructor(private readonly key: string | symbol) {
    this.provide = this.provide.bind(this)
    this.consume = this.consume.bind(this)
  }

  public provide(element: ConnectableElement, signal: S): void {
    element.addEventListener("aria-ui/context-request", (event) => {
      const { key, callback } = event as ContextRequestEvent<S>
      if (key === this.key) {
        callback(signal)
      }
    })
  }

  public consume(element: ConnectableElement): S | undefined {
    let signal: S | undefined
    element.dispatchEvent(
      new ContextRequestEvent<S>(this.key, (s) => {
        signal = s
      }),
    )
    return signal
  }
}

/**
 * Creates a new context.
 */
export function createContext<S extends Signal>(
  key: string | symbol,
): Context<S> {
  return new ContextImpl<S>(
    typeof key === "string" ? `aira-ui/context/${key}` : key,
  )
}

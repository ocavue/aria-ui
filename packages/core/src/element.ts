import { HTMLElement } from "server-dom-shim"

import type { ConnectableElement } from "./connectable-element"
import { type SignalState, mapSignals } from "./signal-state"
import type { Signal } from "./signals"

/**
 * Base class for all custom elements in Aria UI. It implements the
 * {@link ConnectableElement} interface.
 *
 * @group Elements
 */
export class BaseElement extends HTMLElement implements ConnectableElement {
  private _connectedCallbacks: Array<() => VoidFunction | void> = []
  private _disconnectedCallback: VoidFunction[] = []
  private _connected = false

  /**
   * @hidden
   */
  connectedCallback() {
    this._connected = true
    for (const callback of this._connectedCallbacks) {
      const dispose = callback()
      if (dispose) {
        this._disconnectedCallback.push(dispose)
      }
    }
  }

  /**
   * @hidden
   */
  disconnectedCallback() {
    this._connected = false
    for (const callback of this._disconnectedCallback) {
      callback()
    }
    this._disconnectedCallback = []
  }

  /**
   * @hidden
   */
  adoptedCallback() {
    this.disconnectedCallback()
    this.connectedCallback()
  }

  /**
   * @hidden
   */
  addConnectedCallback(callback: () => VoidFunction | void) {
    this._connectedCallbacks.push(callback)
    if (!this._connected) {
      return
    }
    const dispose = callback()
    if (dispose) {
      this._disconnectedCallback.push(dispose)
    }
  }
}

/**
 * Create a custom element class.
 *
 * @public
 */
export function ElementBuilder<Props extends object>(
  useElement: (host: ConnectableElement, state: SignalState<Props>) => void,
  defaultProps: Props,
): {
  new (): BaseElement & Props
  prototype: HTMLElement
} {
  class CustomElement extends BaseElement {
    readonly _s: SignalState<Props>

    constructor() {
      super()
      this._s = mapSignals(defaultProps)
      useElement(this, this._s)
    }
  }

  defineProperties(CustomElement, defaultProps)

  // @ts-expect-error: ignore return type
  return CustomElement
}

function defineProperties<Props extends object>(
  ElementConstructor: new () => { _s: SignalState<Props> },
  defaultProps: Props,
) {
  for (const prop of Object.keys(defaultProps)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      get() {
        return (this._s[prop] as Signal<unknown>).get()
      },
      set(v: unknown) {
        ;(this._s[prop] as Signal<unknown>).set(v)
      },
    })
  }
}

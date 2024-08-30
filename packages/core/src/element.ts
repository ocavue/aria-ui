import mapValues from "just-map-values"
import { HTMLElement } from "server-dom-shim"

import type { ConnectableElement } from "./connectable-element"
import {
  setupProperties,
  type PropDeclaration,
  type PropDeclarations,
} from "./prop"
import type { SignalState } from "./signal-state"
import { createSignal, type Signal } from "./signals"

/**
 * Base class for all custom elements in Aria UI. It implements the
 * {@link ConnectableElement} interface.
 *
 * @group Elements
 */
export class BaseElement extends HTMLElement implements ConnectableElement {
  private _connectedCallbacks: Array<() => VoidFunction | void> = []
  private _disconnectedCallbacks: VoidFunction[] = []
  private _connected = false

  /**
   * @hidden
   */
  connectedCallback() {
    if (this._connected) return

    this._connected = true
    for (const callback of this._connectedCallbacks) {
      const dispose = callback()
      if (dispose) {
        this._disconnectedCallbacks.push(dispose)
      }
    }
  }

  /**
   * @hidden
   */
  disconnectedCallback() {
    if (!this._connected) return

    this._connected = false
    for (const callback of this._disconnectedCallbacks) {
      callback()
    }
    this._disconnectedCallbacks = []
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
      this._disconnectedCallbacks.push(dispose)
    }
  }
}

function getSignalFromProp(prop: PropDeclaration<unknown>): Signal<unknown> {
  return createSignal(prop.default)
}

function getSignalsFromProps(props: PropDeclarations<any>): SignalState<any> {
  return mapValues(props, getSignalFromProp)
}

/**
 * Create a custom element class.
 *
 * @public
 */
export function ElementBuilder<Props extends object>(
  useElement: (host: ConnectableElement, state: SignalState<Props>) => void,
  props: PropDeclarations<Props>,
): {
  new (): BaseElement & Props
  prototype: HTMLElement
} {
  const [observedAttributes, attributeChangedCallback, useProperties] =
    setupProperties(props)

  class CustomElement extends BaseElement {
    readonly _s: SignalState<Props>

    static observedAttributes = observedAttributes

    constructor() {
      super()
      this._s = getSignalsFromProps(props)
      useElement(this, this._s)
      useProperties(this, this._s)
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      attributeChangedCallback(this._s, name, newValue)
    }
  }

  defineGetterSetter(CustomElement, props)

  // @ts-expect-error: ignore return type
  return CustomElement
}

function defineGetterSetter<Props extends object>(
  ElementConstructor: new () => { _s: SignalState<Props> },
  props: PropDeclarations<Props>,
) {
  for (const prop of Object.keys(props)) {
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

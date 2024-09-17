import mapValues from "just-map-values"
import { HTMLElement } from "server-dom-shim"

import type { ConnectableElement } from "./connectable-element"
import { defineEmit, type EventDeclarations } from "./event"
import {
  type PropDeclaration,
  type PropDeclarations,
  setupProperties,
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

export interface CustomElementOptions<
  Props extends { [PropName in keyof Props]: unknown },
  Events extends { [EventType in keyof Events]: CustomEvent },
> {
  props: PropDeclarations<Props>
  events: EventDeclarations<Events>
  setup: (element: BaseElement, options: SetupOptions<Props, Events>) => void
}

export interface SetupOptions<
  Props extends { [PropName in keyof Props]: unknown },
  Events extends { [EventType in keyof Events]: CustomEvent },
> {
  state: SignalState<Props>
  emit: EventEmitter<Events>
}

export type EventEmitter<
  Events extends { [EventType in keyof Events]: CustomEvent },
  EventType extends keyof Events = keyof Events,
> = (type: EventType, detail: Events[EventType]["detail"]) => void

export type BaseElementConstructor<
  Props extends { [PropName in keyof Props]: unknown },
> = new () => BaseElement & Props

/**
 * Defines a custom element constructor.
 *
 * @param options
 */
export function defineCustomElement<
  Props extends { [PropName in keyof Props]: unknown },
  Events extends { [EventType in keyof Events]: CustomEvent },
>({
  props,
  events,
  setup,
}: CustomElementOptions<Props, Events>): BaseElementConstructor<Props> {
  const [observedAttributes, attributeChangedCallback, useProperties] =
    setupProperties(props)

  class CustomElement extends BaseElement {
    readonly _s: SignalState<Props>

    static observedAttributes = observedAttributes

    constructor() {
      super()
      this._s = getSignalsFromProps(props)
      const emit = defineEmit(this, events)
      setup(this, { state: this._s, emit })
      useProperties(this, this._s)
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      attributeChangedCallback(this._s, name, newValue)
    }
  }

  defineGetterSetter(CustomElement, props)

  return CustomElement as BaseElementConstructor<any> as BaseElementConstructor<Props>
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

function getSignalFromProp(prop: PropDeclaration<unknown>): Signal<unknown> {
  return createSignal(prop.default)
}

function getSignalsFromProps(props: PropDeclarations<any>): SignalState<any> {
  return mapValues(props, getSignalFromProp)
}

/**
 * Adds the given custom element to the custom element registry.
 */
export function registerCustomElement(
  name: string,
  element: CustomElementConstructor,
) {
  if (typeof customElements === "undefined" || customElements.get(name)) {
    return
  }
  customElements.define(name, element)
}

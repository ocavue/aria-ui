import mapValues from "just-map-values"

import { BaseElement } from "./element"
import type { EventDeclarations } from "./event"
import {
  type PropDeclaration,
  type PropDeclarations,
  setupProperties,
} from "./prop"
import type { SignalState } from "./signal-state"
import { type Signal, createSignal } from "./signals"

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

export function defineEmit<
  Events extends { [EventType in keyof Events]: CustomEvent },
>(element: HTMLElement, events: EventDeclarations<Events>) {
  return function emit(
    type: keyof Events,
    detail: Events[keyof Events]["detail"],
  ) {
    const declaration = events[type]
    if (!declaration) {
      throw new Error(`Event type "${String(type)}" is not defined`)
    }

    const bubbles = declaration.bubbles ?? false
    const cancelable = declaration.cancelable ?? true
    const composed = declaration.composed ?? false

    const event = new CustomEvent(type as string, {
      detail,
      bubbles,
      cancelable,
      composed,
    })

    element.dispatchEvent(event)
  }
}

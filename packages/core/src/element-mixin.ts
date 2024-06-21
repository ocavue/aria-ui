import { BaseElement } from "./base-element"
import type { ConnectableElement } from "./connectable-element"
import { mapSignals, type SignalState } from "./signal-state"
import type { Signal } from "./signals"

/**
 * A mixin for creating custom elements.
 *
 * @public
 */
export function ElementMixin<Props extends object>(
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

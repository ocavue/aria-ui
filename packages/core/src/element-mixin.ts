import { BaseElement } from "./base-element"
import type { ConnectableElement } from "./connectable-element"
import type { SignalState } from "./signal-state"

/**
 * A mixin for creating custom elements.
 *
 * @public
 */
export function ElementMixin<Props extends object>(
  useElement: (
    host: ConnectableElement,
    props?: Partial<Props>,
  ) => SignalState<Props>,
  defaultProps: Props,
): {
  new (): BaseElement & Props
  prototype: HTMLElement
} {
  class CustomElement extends BaseElement {
    readonly _s: SignalState<Props>

    constructor() {
      super()
      this._s = useElement(this)
    }
  }

  defineProperties(CustomElement, defaultProps)

  // @ts-expect-error: we are using a mixin
  return CustomElement
}

function defineProperties<Props extends object>(
  ElementConstructor: new () => { _s: SignalState<Props> },
  defaultProps: Props,
) {
  for (const prop of Object.keys(defaultProps)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      get() {
        return this._s[prop].value as unknown
      },
      set(v: unknown) {
        this._s[prop].value = v
      },
    })
  }
}

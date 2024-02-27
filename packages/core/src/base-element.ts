import type { ConnectableElement } from "./connectable-element"

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

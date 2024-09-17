import { HTMLElement } from "server-dom-shim"

import type { ConnectableElement } from "./connectable-element"

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

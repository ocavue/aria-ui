import type { HTMLElement } from "server-dom-shim"

/**
 * Any HTML element that has implemented the `addConnectedCallback` method.
 *
 * @group Elements
 */

export interface ConnectableElement extends HTMLElement {
  /**
   * Registers a callback to be called when the element is connected to the DOM.
   * This callback can return a cleanup function that will be called when the
   * element is disconnected from the DOM.
   */
  addConnectedCallback: (callback: () => VoidFunction | void) => void
}

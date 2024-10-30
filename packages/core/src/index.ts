/**
 * A compact and efficient toolkit for building reactive web components. It
 * powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can
 * also be used independently.
 *
 * ## Key Features
 *
 * ### Reactive Signals
 *
 * Uses signals to manage state reactively and automatically update the DOM in
 * response to state changes. It's powered by the mature and battle-tested
 * [`@preact/signals-core`](https://github.com/preactjs/signals) library.
 *
 * ### Context Management
 *
 * Shares signals easily across widely nested HTML elements through context.
 *
 * ### DOM Manipulation Utilities
 *
 * A comprehensive collection of utilities for DOM interactions, enabling
 * declarative management of attributes, styles, and event listeners.
 *
 * @module
 */

export type { ConnectableElement } from "./connectable-element"
export { createContext, type Context } from "./context"
export {
  useAnimationFrame,
  useAriaAttribute,
  useAriaRole,
  useAttribute,
  useEventListener,
  useQuerySelector,
  useQuerySelectorAll,
  useStyle,
} from "./dom"
export {
  BaseElement,
  defineCustomElement,
  registerCustomElement,
  type BaseElementConstructor,
  type CustomElementOptions,
  type EventEmitter,
  type SetupOptions,
} from "./element"
export { defineEmit } from "./event"
export type {
  EventDeclaration,
  EventDeclarations,
} from "./event"
export type {
  PropDeclaration,
  PropDeclarations,
} from "./prop"
export { assignProps } from "./props"
export {
  getStateFromProps,
  mapSignals,
  mapValues,
  type SignalState,
} from "./signal-state"
export {
  batch,
  createComputed,
  createSignal,
  untracked,
  useEffect,
  type ReadonlySignal,
  type Signal,
  type SignalValue,
} from "./signals"
export type { TypedEventTarget } from "./types"

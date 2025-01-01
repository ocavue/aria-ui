# @aria-ui/core

A compact and efficient toolkit for building reactive web components. It powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can also be used independently.

## Key Features

### Reactive Signals

Uses signals to manage state reactively and automatically update the DOM in response to state changes. It's powered by the mature and battle-tested [`@preact/signals-core`](https://github.com/preactjs/signals) library.

### Context Management

Shares signals easily across widely nested HTML elements through context.

### DOM Manipulation Utilities

A comprehensive collection of utilities for DOM interactions, enabling declarative management of attributes, styles, and event listeners.

## API Reference

### BaseElement <a id="base-element" href="#base-element">#</a>

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](README.md#connectable-element) interface.

#### Group

Elements

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new BaseElement(): BaseElement
```

</dd>

</dl>

### ConnectableElement <a id="connectable-element" href="#connectable-element">#</a>

Any HTML element that has implemented the `addConnectedCallback` method.

#### Group

Elements

<dl>

<dt>

`addConnectedCallback: (callback: () => void | VoidFunction) => void`

</dt>

<dd>

Registers a callback to be called when the element is connected to the DOM. This callback can return a cleanup function that will be called when the element is disconnected from the DOM.

</dd>

</dl>

### Context <a id="context" href="#context">#</a>

A context is a way to provide and consume signals in a HTML tree.

#### Group

Contexts

<dl>

<dt>

`consume`

</dt>

<dd>

Receives the signal from a parent element.

**Returns**

A signal that is double-bound to the provided signal.

```ts
const consume: (element: ConnectableElement) => Signal<T>;
```

</dd>

<dt>

`provide`

</dt>

<dd>

Provides a signal to all children of the element.

```ts
const provide: (
  element: ConnectableElement,
  signal: Signal<T> | ReadonlySignal<T>,
) => void;
```

</dd>

</dl>

### CustomElementOptions <a id="custom-element-options" href="#custom-element-options">#</a>

<dl>

<dt>

`events: EventDeclarations<Events>`

</dt>

<dd>

</dd>

<dt>

`props: PropDeclarations<Props>`

</dt>

<dd>

</dd>

<dt>

`setup: (element: BaseElement, options: SetupOptions<Props, Events>) => void`

</dt>

<dd>

</dd>

</dl>

### ReadonlySignal <a id="readonly-signal" href="#readonly-signal">#</a>

A read-only signal that holds a reactive value.

<dl>

<dt>

`get value(): T`

</dt>

<dd>

**Deprecated**

</dd>

<dt>

`get`

</dt>

<dd>

Get the signal's current value.

```ts
const get: () => T;
```

</dd>

<dt>

`peek`

</dt>

<dd>

Get the signal's current value without subscribing.

```ts
const peek: () => T;
```

</dd>

</dl>

### SetupOptions <a id="setup-options" href="#setup-options">#</a>

<dl>

<dt>

`emit: EventEmitter<Events, keyof Events>`

</dt>

<dd>

</dd>

<dt>

`state: SignalState<Props>`

</dt>

<dd>

</dd>

</dl>

### Signal <a id="signal" href="#signal">#</a>

A mutable signal that can be used to manage reactive state changes.

<dl>

<dt>

`set value(value: T)`

</dt>

<dd>

**Deprecated**

</dd>

<dt>

`get`

</dt>

<dd>

Get the signal's current value.

```ts
const get: () => T;
```

</dd>

<dt>

`peek`

</dt>

<dd>

Get the signal's current value without subscribing.

```ts
const peek: () => T;
```

</dd>

<dt>

`set`

</dt>

<dd>

Set the value of the signal.

```ts
const set: (value: T) => void;
```

</dd>

</dl>

### TypedEventTarget <a id="typed-event-target" href="#typed-event-target">#</a>

An interface thats can be used to register event listeners.

<dl>

<dt>

`addEventListener: (type: EventType, listener: (event: DocumentEventMap[EventType]) => void) => void`

</dt>

<dd>

</dd>

<dt>

`removeEventListener: (type: EventType, listener: (event: DocumentEventMap[EventType]) => void) => void`

</dt>

<dd>

</dd>

</dl>

### BaseElementConstructor <a id="base-element-constructor" href="#base-element-constructor">#</a>

**Type**: `new () => BaseElement & Props`

### EventDeclaration <a id="event-declaration" href="#event-declaration">#</a>

Defines options for an event.

**Type**: `{ bubbles?: boolean; cancelable?: boolean; composed?: boolean }`

### EventDeclarations <a id="event-declarations" href="#event-declarations">#</a>

Map of event types to EventDeclaration options.

**Type**: `{[EventType in keyof Required<Events>]: EventDeclaration}`

### EventEmitter <a id="event-emitter" href="#event-emitter">#</a>

**Type**: `(type: EventType extends string ? EventType : never, detail: EventType extends string ? Events[EventType]["detail"] : never) => void`

### PropDeclaration <a id="prop-declaration" href="#prop-declaration">#</a>

Defines options for a property.

**Type**: `{ attribute?: boolean | string; default: T; fromAttribute?: (value: string | null) => T; toAttribute?: (value: T) => string | null }`

### PropDeclarations <a id="prop-declarations" href="#prop-declarations">#</a>

Map of props to PropDeclaration options.

**Type**: `{[K in keyof Required<T>]: PropDeclaration<T[K]>}`

### SignalState <a id="signal-state" href="#signal-state">#</a>

A plain object containing signals.

#### Group

Props and States

**Type**: `{[K in keyof Required<T>]: Signal<T[K]>}`

### SignalValue <a id="signal-value" href="#signal-value">#</a>

Extracts the value type from a signal type.

#### Group

Signals

**Type**: `S extends Signal<infer T> ? T : never`

### assignProps <a id="assign-props" href="#assign-props">#</a>

```ts
function assignProps<T extends object>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T>;
```

Merges two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

**Group**

Props and States

### batch <a id="batch" href="#batch">#</a>

Groups multiple signal updates into a single batch, optimizing performance by reducing the number of updates.

This is a re-export of `batch` from `@preact/signals-core`.

**Group**

Signals

```ts
function batch<T>(fn: () => T): T;
```

Combine multiple value updates into one "commit" at the end of the provided callback.

Batches can be nested and changes are only flushed once the outermost batch callback completes.

Accessing a signal that has been modified within a batch will reflect its updated value.

**Returns**

The value returned by the callback.

### createComputed <a id="create-computed" href="#create-computed">#</a>

```ts
function createComputed<T>(fn: () => T): ReadonlySignal<T>;
```

Creates a computed signal that automatically updates its value based on the reactive dependencies it uses. Computed signals are read-only and are used to derive state from other signals, recalculating their value when dependencies change.

**Group**

Signals

### createContext <a id="create-context" href="#create-context">#</a>

```ts
function createContext<T>(key: string | symbol, defaultValue: T): Context<T>;
```

Creates a new context.

**Group**

Contexts

### createSignal <a id="create-signal" href="#create-signal">#</a>

```ts
function createSignal<T>(value: T): Signal<T>;
```

Creates and returns a new signal with the given initial value. Signals are reactive data sources that can be read and written to, allowing components to reactively update when their values change.

**Group**

Signals

### defineCustomElement <a id="define-custom-element" href="#define-custom-element">#</a>

```ts
function defineCustomElement<
  Props extends { [PropName in string | number | symbol]: unknown },
  Events extends { [EventType in string | number | symbol]: CustomEvent },
>(options: CustomElementOptions<Props, Events>): BaseElementConstructor<Props>;
```

Defines a custom element constructor.

### defineEmit <a id="define-emit" href="#define-emit">#</a>

```ts
function defineEmit<
  Events extends { [EventType in string | number | symbol]: CustomEvent },
>(
  element: HTMLElement,
  events: EventDeclarations<Events>,
): (type: keyof Events, detail: Events[keyof Events]["detail"]) => void;
```

### getStateFromProps <a id="get-state-from-props" href="#get-state-from-props">#</a>

```ts
function getStateFromProps<Props extends object>(
  props: PropDeclarations<Props>,
): SignalState<Props>;
```

### mapSignals <a id="map-signals" href="#map-signals">#</a>

```ts
function mapSignals<T extends object>(values: T): SignalState<T>;
```

Maps every value in the given object to a signal.

**Group**

Props and States

**Deprecated**

### mapValues <a id="map-values" href="#map-values">#</a>

```ts
function mapValues<T extends object>(signals: SignalState<T>): T;
```

Maps every signal in the given object to its current value.

**Group**

Props and States

**Deprecated**

### registerCustomElement <a id="register-custom-element" href="#register-custom-element">#</a>

```ts
function registerCustomElement(
  name: string,
  element: CustomElementConstructor,
): void;
```

Adds the given custom element to the custom element registry.

### untracked <a id="untracked" href="#untracked">#</a>

Executes a given computation without automatically tracking its dependencies, useful for avoiding unnecessary re-computations.

This is a re-export of `untracked` from `@preact/signals-core`.

**Group**

Signals

```ts
function untracked<T>(fn: () => T): T;
```

Run a callback function that can access signal values without subscribing to the signal updates.

**Returns**

The value returned by the callback.

### useAnimationFrame <a id="use-animation-frame" href="#use-animation-frame">#</a>

```ts
function useAnimationFrame(
  element: ConnectableElement,
  effect: () => void | (() => void | VoidFunction),
): () => void;
```

Executes an effect in the next animation frame.

The given `effect` function will be called when the element is connected, and when the dependencies change afterward.

`effect` could return a function `callback`. `callback` will be called in the next animation frame.

`callback` could return a function `dispose`. `dispose` will be called when the effect is disposed.

**Group**

DOM

### useAriaAttribute <a id="use-aria-attribute" href="#use-aria-attribute">#</a>

```ts
function useAriaAttribute<
  K extends
    | "aria-dropeffect"
    | "aria-grabbed"
    | "aria-atomic"
    | "aria-busy"
    | "aria-controls"
    | "aria-current"
    | "aria-describedby"
    | "aria-details"
    | "aria-disabled"
    | "aria-errormessage"
    | "aria-flowto"
    | "aria-haspopup"
    | "aria-hidden"
    | "aria-invalid"
    | "aria-keyshortcuts"
    | "aria-label"
    | "aria-labelledby"
    | "aria-live"
    | "aria-owns"
    | "aria-relevant"
    | "aria-roledescription"
    | "aria-activedescendant"
    | "aria-colcount"
    | "aria-colindex"
    | "aria-colspan"
    | "aria-description"
    | "aria-posinset"
    | "aria-rowcount"
    | "aria-rowindex"
    | "aria-rowspan"
    | "aria-setsize"
    | "aria-autocomplete"
    | "aria-checked"
    | "aria-expanded"
    | "aria-level"
    | "aria-modal"
    | "aria-multiline"
    | "aria-multiselectable"
    | "aria-orientation"
    | "aria-placeholder"
    | "aria-pressed"
    | "aria-readonly"
    | "aria-required"
    | "aria-selected"
    | "aria-sort"
    | "aria-valuemax"
    | "aria-valuemin"
    | "aria-valuenow"
    | "aria-valuetext",
>(
  element: ConnectableElement,
  key: K,
  compute: () => AriaAttributes[K],
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

This is a TypeScript type-safe version of [useAttribute](README.md#use-attribute).

**Group**

DOM

### useAriaRole <a id="use-aria-role" href="#use-aria-role">#</a>

```ts
function useAriaRole(
  element: ConnectableElement,
  role: AriaRole | (() => AriaRole | undefined),
): VoidFunction;
```

Sets the `role` attribute of the element when it's connected.

You can pass a string or a compute function that returns a string.

**Group**

DOM

### useAttribute <a id="use-attribute" href="#use-attribute">#</a>

```ts
function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => undefined | null | string | number,
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

**Group**

DOM

### useEffect <a id="use-effect" href="#use-effect">#</a>

```ts
function useEffect(
  element: ConnectableElement,
  callback: () => void | VoidFunction,
): () => void;
```

Registers a callback to be called when the given element is connected to the DOM. It will track which signals are accessed and re-run their callback when those signals change. The callback can return a cleanup function that will be called when the effect is destroyed.

The effect will be destroyed and all signals it was subscribed to will be unsubscribed from, when the element is disconnected from the DOM. You can also manually destroy the effect by calling the returned function.

**Group**

Signals

### useEventListener <a id="use-event-listener" href="#use-event-listener">#</a>

```ts
function useEventListener<K extends keyof HTMLElementEventMap>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): VoidFunction;
```

Registers an event listener on the element.

**Group**

DOM

### useQuerySelector <a id="use-query-selector" href="#use-query-selector">#</a>

```ts
function useQuerySelector<E extends Element>(
  element: ConnectableElement,
  selector: string,
  options?: MutationObserverInit,
): ReadonlySignal<E | null>;
```

Returns the first element matching the given selector.

**Group**

DOM

### useQuerySelectorAll <a id="use-query-selector-all" href="#use-query-selector-all">#</a>

```ts
function useQuerySelectorAll<E extends Element>(
  element: ConnectableElement,
  selector: string,
  options?: MutationObserverInit,
): ReadonlySignal<NodeListOf<E>>;
```

Returns all elements matching the given selector.

**Group**

DOM

### useStyle <a id="use-style" href="#use-style">#</a>

```ts
function useStyle<K extends keyof CSSStyleDeclaration>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): VoidFunction;
```

Sets the computed style of the element when it's connected.

**Group**

DOM

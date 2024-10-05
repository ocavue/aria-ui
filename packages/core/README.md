# @aria-ui/core

A compact and efficient toolkit for building reactive web components. It powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can also be used independently.

## Key Features

### Reactive Signals

Uses signals to manage state reactively and automatically update the DOM in response to state changes. It's powered by the mature and battle-tested [`@preact/signals-core`](https://github.com/preactjs/signals) library.

### Context Management

Shares signals easily across widely nested HTML elements through context.

### DOM Manipulation Utilities

A comprehensive collection of utilities for DOM interactions, enabling declarative management of attributes, styles, and event listeners.

## API

### BaseElement <a id="base-element" href="#base-element">#</a>

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](README.md#connectable-element) interface.

<dl>

<dt>

`constructor`

</dt>

<dd>

```ts
new BaseElement();
```

</dd>

</dl>

### ConnectableElement <a id="connectable-element" href="#connectable-element">#</a>

Any HTML element that has implemented the `addConnectedCallback` method.

<dl>

<dt>

`addConnectedCallback`

</dt>

<dd>

Registers a callback to be called when the element is connected to the DOM. This callback can return a cleanup function that will be called when the element is disconnected from the DOM.

**Type**: `(callback: () => void | VoidFunction) => void`

</dd>

</dl>

### Context <a id="context" href="#context">#</a>

A context is a way to provide and consume signals in a HTML tree.

<dl>

<dt>

`consume`

</dt>

<dd>

```ts
const consume: (element: ConnectableElement) => Signal<T>;
```

</dd>

<dt>

`provide`

</dt>

<dd>

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

`events`

</dt>

<dd>

**Type**: `EventDeclarations<Events>`

</dd>

<dt>

`props`

</dt>

<dd>

**Type**: `PropDeclarations<Props>`

</dd>

<dt>

`setup`

</dt>

<dd>

**Type**: `(element: BaseElement, options: SetupOptions<Props, Events>) => void`

</dd>

</dl>

### ReadonlySignal <a id="readonly-signal" href="#readonly-signal">#</a>

A read-only signal that holds a reactive value.

<dl>

<dt>

`value`

</dt>

<dd>

**Type**: `T`

<dt>

`get`

</dt>

<dd>

```ts
const get: () => T;
```

</dd>

<dt>

`peek`

</dt>

<dd>

```ts
const peek: () => T;
```

</dd>

</dl>

### SetupOptions <a id="setup-options" href="#setup-options">#</a>

<dl>

<dt>

`emit`

</dt>

<dd>

**Type**: `EventEmitter<Events, keyof Events>`

</dd>

<dt>

`state`

</dt>

<dd>

**Type**: `SignalState<Props>`

</dd>

</dl>

### Signal <a id="signal" href="#signal">#</a>

A mutable signal that can be used to manage reactive state changes.

<dl>

<dt>

`value`

</dt>

<dd>

**Type**: `void`

<dt>

`get`

</dt>

<dd>

```ts
const get: () => T;
```

</dd>

<dt>

`peek`

</dt>

<dd>

```ts
const peek: () => T;
```

</dd>

<dt>

`set`

</dt>

<dd>

```ts
const set: (value: T) => void;
```

</dd>

</dl>

### TypedEventTarget <a id="typed-event-target" href="#typed-event-target">#</a>

An interface thats can be used to register event listeners.

<dl>

<dt>

`addEventListener`

</dt>

<dd>

**Type**: `(type: EventType, listener: (event: DocumentEventMap[EventType]) => void) => void`

</dd>

<dt>

`removeEventListener`

</dt>

<dd>

**Type**: `(type: EventType, listener: (event: DocumentEventMap[EventType]) => void) => void`

</dd>

</dl>

### BaseElementConstructor <a id="base-element-constructor" href="#base-element-constructor">#</a>

**Type**: `() => BaseElement & Props`

### EventDeclaration <a id="event-declaration" href="#event-declaration">#</a>

Defines options for an event.

**Type**: `Object`

### EventDeclarations <a id="event-declarations" href="#event-declarations">#</a>

Map of event types to EventDeclaration options.

**Type**: `{ [EventType in keyof Required<Events>]: EventDeclaration }`

### EventEmitter <a id="event-emitter" href="#event-emitter">#</a>

**Type**: `(type: EventType extends string ? EventType : never, detail: EventType extends string ? Events[EventType]["detail"] : never) => void`

### PropDeclaration <a id="prop-declaration" href="#prop-declaration">#</a>

Defines options for a property.

**Type**: `Object`

### PropDeclarations <a id="prop-declarations" href="#prop-declarations">#</a>

Map of props to PropDeclaration options.

**Type**: `{ [K in keyof Required<T>]: PropDeclaration<T[K]> }`

### SignalState <a id="signal-state" href="#signal-state">#</a>

A plain object containing signals.

**Type**: `{ [K in keyof Required<T>]: Signal<T[K]> }`

### SignalValue <a id="signal-value" href="#signal-value">#</a>

Extracts the value type from a signal type.

**Type**: `S extends Signal<infer T> ? T : never`

### assignProps <a id="assign-props" href="#assign-props">#</a>

```ts
function assignProps<T>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T>;
```

Merges two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

### batch <a id="batch" href="#batch">#</a>

Groups multiple signal updates into a single batch, optimizing performance by reducing the number of updates.

This is a re-export of `batch` from `@preact/signals-core`.

```ts
function batch<T>(fn: () => T): T;
```

Combine multiple value updates into one "commit" at the end of the provided callback.

Batches can be nested and changes are only flushed once the outermost batch callback completes.

Accessing a signal that has been modified within a batch will reflect its updated value.

**Returns**: The value returned by the callback.

### createComputed <a id="create-computed" href="#create-computed">#</a>

```ts
function createComputed<T>(fn: () => T): ReadonlySignal<T>;
```

Creates a computed signal that automatically updates its value based on the reactive dependencies it uses. Computed signals are read-only and are used to derive state from other signals, recalculating their value when dependencies change.

### createContext <a id="create-context" href="#create-context">#</a>

```ts
function createContext<T>(key: string | symbol, defaultValue: T): Context<T>;
```

Creates a new context.

### createSignal <a id="create-signal" href="#create-signal">#</a>

```ts
function createSignal<T>(value: T): Signal<T>;
```

Creates and returns a new signal with the given initial value. Signals are reactive data sources that can be read and written to, allowing components to reactively update when their values change.

### defineCustomElement <a id="define-custom-element" href="#define-custom-element">#</a>

```ts
function defineCustomElement<Props, Events>(
  options: CustomElementOptions<Props, Events>,
): BaseElementConstructor<Props>;
```

Defines a custom element constructor.

### defineEmit <a id="define-emit" href="#define-emit">#</a>

```ts
function defineEmit<Events>(
  element: HTMLElement,
  events: EventDeclarations<Events>,
): Function;
```

### getStateFromProps <a id="get-state-from-props" href="#get-state-from-props">#</a>

```ts
function getStateFromProps<Props>(
  props: PropDeclarations<Props>,
): SignalState<Props>;
```

### mapSignals <a id="map-signals" href="#map-signals">#</a>

```ts
function mapSignals<T>(values: T): SignalState<T>;
```

Maps every value in the given object to a signal.

**Deprecated**

### mapValues <a id="map-values" href="#map-values">#</a>

```ts
function mapValues<T>(signals: SignalState<T>): T;
```

Maps every signal in the given object to its current value.

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

```ts
function untracked<T>(fn: () => T): T;
```

Run a callback function that can access signal values without subscribing to the signal updates.

**Returns**: The value returned by the callback.

### useAnimationFrame <a id="use-animation-frame" href="#use-animation-frame">#</a>

```ts
function useAnimationFrame(
  element: ConnectableElement,
  effect: () => void | Function,
): Function;
```

Executes an effect in the next animation frame.

The given `effect` function will be called when the element is connected, and when the dependencies change afterward.

`effect` could return a function `callback`. `callback` will be called in the next animation frame.

`callback` could return a function `dispose`. `dispose` will be called when the effect is disposed.

### useAriaAttribute <a id="use-aria-attribute" href="#use-aria-attribute">#</a>

```ts
function useAriaAttribute<K>(
  element: ConnectableElement,
  key: K,
  compute: () => AriaAttributes[K],
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

This is a TypeScript type-safe version of [useAttribute](README.md#use-attribute).

### useAriaRole <a id="use-aria-role" href="#use-aria-role">#</a>

```ts
function useAriaRole(
  element: ConnectableElement,
  role: AriaRole | Function,
): VoidFunction;
```

Sets the `role` attribute of the element when it's connected.

You can pass a string or a compute function that returns a string.

### useAttribute <a id="use-attribute" href="#use-attribute">#</a>

```ts
function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => undefined | null | string | number,
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

### useEffect <a id="use-effect" href="#use-effect">#</a>

```ts
function useEffect(
  element: ConnectableElement,
  callback: () => void | VoidFunction,
): Function;
```

Registers a callback to be called when the given element is connected to the DOM. It will track which signals are accessed and re-run their callback when those signals change. The callback can return a cleanup function that will be called when the effect is destroyed.

The effect will be destroyed and all signals it was subscribed to will be unsubscribed from, when the element is disconnected from the DOM. You can also manually destroy the effect by calling the returned function.

### useEventListener <a id="use-event-listener" href="#use-event-listener">#</a>

```ts
function useEventListener<K>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): VoidFunction;
```

Registers an event listener on the element.

### useQuerySelector <a id="use-query-selector" href="#use-query-selector">#</a>

```ts
function useQuerySelector<E>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit,
): ReadonlySignal<E | null>;
```

Returns the first element matching the given selector.

### useQuerySelectorAll <a id="use-query-selector-all" href="#use-query-selector-all">#</a>

```ts
function useQuerySelectorAll<E>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit,
): ReadonlySignal<NodeListOf<E>>;
```

Returns all elements matching the given selector.

### useStyle <a id="use-style" href="#use-style">#</a>

```ts
function useStyle<K>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): VoidFunction;
```

Sets the computed style of the element when it's connected.

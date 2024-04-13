# @aria-ui/core

A compact and efficient toolkit for building reactive web components. It powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can also be used independently.

## Key Features

### Reactive Signals

Uses signals to manage state reactively and automatically update the DOM in response to state changes. It's powered by the mature and battle-tested [`@preact/signals-core`](https://github.com/preactjs/signals) library.

### Context Management

Shares signals easily across widely nested HTML elements through context.

### DOM Manipulation Utilities

A comprehensive collection of utilities for DOM interactions, enabling declarative management of attributes, styles, and event listeners.

## Contexts

### Context\<T\>

A context is a way to provide and consume signals in a HTML tree.

#### Methods

##### consume()

```ts
consume(element: ConnectableElement): Signal<T>
```

Receives the signal from a parent element.

##### provide()

```ts
provide(element: ConnectableElement, signal: Signal<T>): void
```

Provides a signal to all children of the element.

### createContext()

```ts
function createContext<T>(key: string | symbol, defaultValue: T): Context<T>;
```

Creates a new context.

## DOM

### useAnimationFrame()

```ts
function useAnimationFrame(element: ConnectableElement, effect: () => void | () => void | VoidFunction): () => void
```

Executes an effect in the next animation frame.

The given `effect` function will be called when the element is connected, and when the dependencies change afterward.

`effect` could return a function `callback`. `callback` will be called in the next animation frame.

`callback` could return a function `dispose`. `dispose` will be called when the effect is disposed.

### useAriaAttribute()

```ts
function useAriaAttribute<K>(
  element: ConnectableElement,
  key: K,
  compute: () => AriaAttributes[K],
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

This is a TypeScript type-safe version of [useAttribute](README.md#useattribute).

### useAriaRole()

```ts
function useAriaRole(element: ConnectableElement, role: AriaRole | () => AriaRole | undefined): VoidFunction
```

Sets the `role` attribute of the element when it's connected.

You can pass a string or a compute function that returns a string.

### useAttribute()

```ts
function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => undefined | string | number,
): VoidFunction;
```

Sets the computed attribute of the element when it's connected.

### useEventListener()

```ts
function useEventListener<K>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): VoidFunction;
```

Registers an event listener on the element.

### useQuerySelector()

```ts
function useQuerySelector<E>(
  element: ConnectableElement,
  selector: string,
): ReadonlySignal<E | null>;
```

Returns the first element matching the given selector.

### useQuerySelectorAll()

```ts
function useQuerySelectorAll<E>(
  element: ConnectableElement,
  selector: string,
): ReadonlySignal<NodeListOf<E>>;
```

Returns all elements matching the given selector.

### useStyle()

```ts
function useStyle<K>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): VoidFunction;
```

Sets the computed style of the element when it's connected.

## Elements

### BaseElement

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](README.md#connectableelement) interface.

```ts
new BaseElement(): BaseElement
```

### ConnectableElement

Any HTML element that has implemented the `addConnectedCallback` method.

| Property | Type | Description |
| :-- | :-- | :-- |
| `addConnectedCallback` | (`callback`: () => `void` \| `VoidFunction`) => `void` | Registers a callback to be called when the element is connected to the DOM.<br />This callback can return a cleanup function that will be called when the<br />element is disconnected from the DOM. |

## Props and States

### SingalState\<T\>

```ts
type SingalState<T>: { [K in keyof T]: Signal<T[K]> };
```

A plain object containing signals.

### assignProps()

```ts
function assignProps<T>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T>;
```

Merges two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

### mapSignals()

```ts
function mapSignals<T>(values: T): SingalState<T>;
```

Maps every value in the given object to a signal.

### mapValues()

```ts
function mapValues<T>(signals: SingalState<T>): T;
```

Maps every signal in the given object to its current value.

## Signals

### ReadonlySignal\<T\>

```ts
type ReadonlySignal<T>: _ReadonlySignal<T>;
```

A read-only signal, providing a way to observe state changes without the ability to modify the state.

This is a re-export of `ReadonlySignal` type from `@preact/signals-core`.

### Signal\<T\>

```ts
type Signal<T>: _Signal<T>;
```

A mutable signal that can be used to manage reactive state changes.

This is a re-export of `Signal` type from `@preact/signals-core`.

### SignalValue\<S\>

```ts
type SignalValue<S>: S extends Signal<infer T> ? T : never;
```

Extracts the value type from a signal type.

### batch()

```ts
function batch<T>(fn: () => T): T;
```

Groups multiple signal updates into a single batch, optimizing performance by reducing the number of updates.

This is a re-export of `batch` from `@preact/signals-core`.

### createComputed()

```ts
function createComputed<T>(fn: () => T): ReadonlySignal<T>;
```

Creates a computed signal that automatically updates its value based on the reactive dependencies it uses. Computed signals are read-only and are used to derive state from other signals, recalculating their value when dependencies change.

This is an alias for `computed` from `@preact/signals-core`.

### createSignal()

```ts
function createSignal<T>(value: T): Signal<T>;
```

Creates and returns a new signal with the given initial value. Signals are reactive data sources that can be read and written to, allowing components to reactively update when their values change.

This is an alias for `signal` from `@preact/signals-core`.

### untracked()

```ts
function untracked<T>(fn: () => T): T;
```

Executes a given computation without automatically tracking its dependencies, useful for avoiding unnecessary re-computations.

This is a re-export of `untracked` from `@preact/signals-core`.

### useEffect()

```ts
function useEffect(
  element: ConnectableElement,
  callback: () => void | VoidFunction,
): () => void;
```

Registers a callback to be called when the given element is connected to the DOM. It will track which signals are accessed and re-run their callback when those signals change. The callback can return a cleanup function that will be called when the effect is destroyed.

The effect will be destroyed and all signals it was subscribed to will be unsubscribed from, when the element is disconnected from the DOM. You can also manually destroy the effect by calling the returned function.

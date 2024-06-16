# @aria-ui/core

A compact and efficient toolkit for building reactive web components. It powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can also be used independently.

## Key Features

### Reactive Signals

Uses signals to manage state reactively and automatically update the DOM in response to state changes. It's powered by the mature and battle-tested [`@preact/signals-core`](https://github.com/preactjs/signals) library.

### Context Management

Shares signals easily across widely nested HTML elements through context.

### DOM Manipulation Utilities

A comprehensive collection of utilities for DOM interactions, enabling declarative management of attributes, styles, and event listeners.

## Functions

### ElementMixin()

```ts
function ElementMixin<Props>(
  useElement: (
    host: ConnectableElement,
    props?: Partial<Props>,
  ) => SignalState<Props>,
  defaultProps: Props,
): () => BaseElement & Props;
```

A mixin for creating custom elements.

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
function useAnimationFrame(element: ConnectableElement, effect: () => void | () => void | VoidFunction): void
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
): void;
```

Sets the computed attribute of the element when it's connected.

This is a TypeScript type-safe version of [useAttribute](README.md#useattribute).

### useAriaRole()

```ts
function useAriaRole(element: ConnectableElement, role: AriaRole | () => AriaRole | undefined): void
```

Sets the `role` attribute of the element when it's connected.

You can pass a string or a compute function that returns a string.

### useAttribute()

```ts
function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => undefined | string | number,
): void;
```

Sets the computed attribute of the element when it's connected.

### useEventListener()

```ts
function useEventListener<K>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
```

Registers an event listener on the element.

### useQuerySelector()

```ts
function useQuerySelector<E>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit,
): ReadonlySignal<E | null>;
```

Returns the first element matching the given selector.

### useQuerySelectorAll()

```ts
function useQuerySelectorAll<E>(
  element: ConnectableElement,
  selector: string,
  options: MutationObserverInit,
): ReadonlySignal<NodeListOf<E>>;
```

Returns all elements matching the given selector.

### useStyle()

```ts
function useStyle<K>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): void;
```

Sets the computed style of the element when it's connected.

## Props and States

### SignalState\<T\>

```ts
type SignalState<T>: { [K in keyof T]: Signal<T[K]> };
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
function mapSignals<T>(values: T): SignalState<T>;
```

Maps every value in the given object to a signal.

### mapValues()

```ts
function mapValues<T>(signals: SignalState<T>): T;
```

Maps every signal in the given object to its current value.

## Signals

### SignalValue\<S\>

```ts
type SignalValue<S>: S extends ReadonlySignal<infer T> ? T : never;
```

Extracts the value type from a signal type.

# @aria-ui/core

## Classes

### BaseElement

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](README.md#connectableelement) interface.

```ts
new BaseElement(): BaseElement
```

## Interfaces

### ConnectableElement

Any HTML element that has implemented the `addConnectedCallback` method.

<!-- prettier-ignore-start -->

| Property | Type | Description |
| :------ | :------ | :------ |
| `addConnectedCallback` | (`callback`: () => `void` \| `VoidFunction`) => `void` | Registers a callback to be called when the element is connected to the DOM.<br />This callback can return a cleanup function that will be called when the<br />element is disconnected from the DOM. |

<!-- prettier-ignore-end -->

### Context\<S\>

A context is a way to provide and consume signals in a HTML tree.

#### Methods

##### consume()

```ts
consume(element: ConnectableElement): undefined | S
```

Receives the signal from a parent element.

##### provide()

```ts
provide(element: ConnectableElement, signal: S): void
```

Provides a signal to all children of the element.

## Type Aliases

### SignalValue\<S\>

```ts
type SignalValue<S>: S extends Signal<infer T> ? T : never;
```

### SingalState\<T\>

```ts
type SingalState<T>: { [K in keyof T]: Signal<T[K]> };
```

## Functions

### assignProps()

```ts
function assignProps<T>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T>;
```

Merge two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

### createContext()

```ts
function createContext<S>(key: string | symbol): Context<S>;
```

Creates a new context.

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

### useAriaAttribute()

```ts
function useAriaAttribute<K>(
  element: ConnectableElement,
  key: K,
  compute: () => AriaAttributes[K],
): () => void;
```

### useAriaRole()

```ts
function useAriaRole(
  element: ConnectableElement,
  compute: () => undefined | AriaRole,
): () => void;
```

### useAttribute()

```ts
function useAttribute(
  element: ConnectableElement,
  key: string,
  compute: () => undefined | string | number,
): () => void;
```

### useEffect()

```ts
function useEffect(
  element: ConnectableElement,
  callback: () => void | VoidFunction,
): () => void;
```

### useEventListener()

```ts
function useEventListener<K>(
  element: ConnectableElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
```

### useStyle()

```ts
function useStyle<K>(
  element: ConnectableElement,
  key: K,
  compute: () => CSSStyleDeclaration[K],
): () => void;
```

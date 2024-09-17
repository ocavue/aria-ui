# @aria-ui/core

A compact and efficient toolkit for building reactive web components. It powers the [Aria UI](https://github.com/ocavue/aria-ui) library, but it can also be used independently.

## Key Features

### Reactive Signals

Uses signals to manage state reactively and automatically update the DOM in response to state changes. It's powered by the mature and battle-tested [`@preact/signals-core`](https://github.com/preactjs/signals) library.

### Context Management

Shares signals easily across widely nested HTML elements through context.

### DOM Manipulation Utilities

A comprehensive collection of utilities for DOM interactions, enabling declarative management of attributes, styles, and event listeners.

## Interfaces

### CustomElementOptions\<Props, Events\>

#### Type Parameters

#### Properties

| Property | Type |
| --- | --- |
| `events` | [`EventDeclarations`](README.md#eventdeclarationsevents)\<`Events`\> |
| `props` | [`PropDeclarations`](README.md#propdeclarationst)\<`Props`\> |
| `setup` | (`element`: [`BaseElement`](README.md#baseelement), `options`: [`SetupOptions`](README.md#setupoptionsprops-events)\<`Props`, `Events`\>) => `void` |

### EmptyObject

Represents a strictly empty plain object, the `{}` value.

When you annotate something as the type `{}`, it can be anything except `null` and `undefined`. This means that you cannot use `{}` to represent an empty plain object ([read more](https://stackoverflow.com/questions/47339869/typescript-empty-object-and-any-difference/52193484#52193484)).

### ReadonlySignal\<T\>

A read-only signal that holds a reactive value.

#### Type Parameters

#### Accessors

##### value

#### Methods

##### get()

```ts
get(): T
```

Get the signal's current value.

##### peek()

```ts
peek(): T
```

Get the signal's current value without subscribing.

### SetupOptions\<Props, Events\>

#### Type Parameters

#### Properties

| Property | Type |
| --- | --- |
| `emit` | [`EventEmitter`](README.md#eventemitterevents-eventtype)\<`Events`, keyof `Events`\> |
| `state` | [`SignalState`](README.md#signalstatet)\<`Props`\> |

### Signal\<T\>

A mutable signal that can be used to manage reactive state changes.

#### Type Parameters

#### Accessors

##### value

#### Methods

##### get()

```ts
get(): T
```

Get the signal's current value.

##### peek()

```ts
peek(): T
```

Get the signal's current value without subscribing.

##### set()

```ts
set(value: T): void
```

Set the value of the signal.

### TypedEventTarget\<EventType\>

An interface thats can be used to register event listeners.

#### Type Parameters

#### Properties

| Property | Type |
| --- | --- |
| `addEventListener` | (`type`: `EventType`, `listener`: (`event`: `DocumentEventMap`\[`EventType`\]) => `void`) => `void` |
| `removeEventListener` | (`type`: `EventType`, `listener`: (`event`: `DocumentEventMap`\[`EventType`\]) => `void`) => `void` |

## Type Aliases

### BaseElementConstructor()\<Props\>

```ts
type BaseElementConstructor<Props>: () => BaseElement & Props;
```

#### Type Parameters

### EventDeclaration

```ts
type EventDeclaration: object;
```

Defines options for an event.

#### Type declaration

##### bubbles?

```ts
optional bubbles: boolean;
```

Whether the event bubbles.

###### Default

```ts
false;
```

##### cancelable?

```ts
optional cancelable: boolean;
```

Whether the event is cancelable.

###### Default

```ts
true;
```

##### composed?

```ts
optional composed: boolean;
```

Whether the event is composed.

###### Default

```ts
false;
```

### EventDeclarations\<Events\>

```ts
type EventDeclarations<Events>: { [EventType in keyof Events]: EventDeclaration };
```

Map of event types to EventDeclaration options.

#### Type Parameters

### EventEmitter()\<Events, EventType\>

```ts
type EventEmitter<Events, EventType>: (type: EventType, detail: Events[EventType]["detail"]) => void;
```

#### Type Parameters

### PropDeclaration\<T\>

```ts
type PropDeclaration<T>: object;
```

Defines options for a property.

#### Type Parameters

#### Type declaration

##### attribute?

```ts
optional attribute: boolean | string;
```

Indicates how and whether the property becomes an observed attribute. If the value is `false`, the property is not added to `observedAttributes`. If true or absent, the kebab-case version of the property name is observed (e.g. `fooBar` becomes `foo-bar`). If a string, the string value is observed (e.g `attribute: 'custom-foo-bar'`).

##### default

```ts
default: T;
```

The default value of the property.

##### fromAttribute()?

```ts
optional fromAttribute: (value: string | null) => T;
```

Called to convert an attribute value to a property value.

##### toAttribute()?

```ts
optional toAttribute: (value: T) => string | null;
```

Called to convert a property value to an attribute value.

### PropDeclarations\<T\>

```ts
type PropDeclarations<T>: { [K in keyof T]: PropDeclaration<T[K]> };
```

Map of props to PropDeclaration options.

#### Type Parameters

## Functions

### defineCustomElement()

```ts
function defineCustomElement<Props, Events>(
  options: CustomElementOptions<Props, Events>,
): BaseElementConstructor<Props>;
```

Defines a custom element constructor.

### defineEmit()

```ts
function defineEmit<Events>(
  element: HTMLElement,
  events: EventDeclarations<Events>,
): (type: keyof Events, detail: Events[keyof Events]["detail"]) => void;
```

### registerCustomElement()

```ts
function registerCustomElement(
  name: string,
  element: CustomElementConstructor,
): void;
```

Adds the given custom element to the custom element registry.

## Contexts

### Context\<T\>

A context is a way to provide and consume signals in a HTML tree.

#### Type Parameters

#### Methods

##### consume()

```ts
consume(element: ConnectableElement): Signal<T>
```

Receives the signal from a parent element.

##### provide()

```ts
provide(element: ConnectableElement, signal: Signal<T> | ReadonlySignal<T>): void
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
  compute: () => undefined | null | string | number,
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
): VoidFunction;
```

Sets the computed style of the element when it's connected.

## Elements

### BaseElement

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](README.md#connectableelement) interface.

#### Constructors

```ts
new BaseElement(): BaseElement
```

### ConnectableElement

Any HTML element that has implemented the `addConnectedCallback` method.

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `addConnectedCallback` | (`callback`: () => `void` \| `VoidFunction`) => `void` | Registers a callback to be called when the element is connected to the DOM. This callback can return a cleanup function that will be called when the element is disconnected from the DOM. |

## Props and States

### SignalState\<T\>

```ts
type SignalState<T>: { [K in keyof T]: Signal<T[K]> };
```

A plain object containing signals.

#### Type Parameters

### assignProps()

```ts
function assignProps<T>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T>;
```

Merges two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

### ~~mapSignals()~~

```ts
function mapSignals<T>(values: T): SignalState<T>;
```

Maps every value in the given object to a signal.

#### Deprecated

### ~~mapValues()~~

```ts
function mapValues<T>(signals: SignalState<T>): T;
```

Maps every signal in the given object to its current value.

#### Deprecated

## Signals

### SignalValue\<S\>

```ts
type SignalValue<S>: S extends Signal<infer T> ? T : never;
```

Extracts the value type from a signal type.

#### Type Parameters

### batch()

```ts
function batch<T>(fn: () => T): T;
```

Combine multiple value updates into one "commit" at the end of the provided callback.

Batches can be nested and changes are only flushed once the outermost batch callback completes.

Accessing a signal that has been modified within a batch will reflect its updated value.

### createComputed()

```ts
function createComputed<T>(fn: () => T): ReadonlySignal<T>;
```

Creates a computed signal that automatically updates its value based on the reactive dependencies it uses. Computed signals are read-only and are used to derive state from other signals, recalculating their value when dependencies change.

### createSignal()

```ts
function createSignal<T>(value: T): Signal<T>;
```

Creates and returns a new signal with the given initial value. Signals are reactive data sources that can be read and written to, allowing components to reactively update when their values change.

### untracked()

```ts
function untracked<T>(fn: () => T): T;
```

Run a callback function that can access signal values without subscribing to the signal updates.

### useEffect()

```ts
function useEffect(
  element: ConnectableElement,
  callback: () => void | VoidFunction,
): () => void;
```

Registers a callback to be called when the given element is connected to the DOM. It will track which signals are accessed and re-run their callback when those signals change. The callback can return a cleanup function that will be called when the effect is destroyed.

The effect will be destroyed and all signals it was subscribed to will be unsubscribed from, when the element is disconnected from the DOM. You can also manually destroy the effect by calling the returned function.

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

<a id="customelementoptions"></a>

### CustomElementOptions\<Props, Events\>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="events-1" href="#events-1">events</a>: [`EventDeclarations`](#eventdeclarations)\<`Events`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="props-1" href="#props-1">props</a>: [`PropDeclarations`](#propdeclarations)\<`Props`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="setup" href="#setup">setup</a>: (`element`, `options`) => `void`</code>

</dt>

</dl>

---

<a id="readonlysignal"></a>

### ReadonlySignal\<T\>

A read-only signal that holds a reactive value.

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="value" href="#value">value</a>(): `T`</code>

</dt>

<dd>

###### Deprecated

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="get" href="#get">get</a>(): `T`</code>

</dt>

<dd>

Get the signal's current value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="peek" href="#peek">peek</a>(): `T`</code>

</dt>

<dd>

Get the signal's current value without subscribing.

</dd>

</dl>

---

<a id="setupoptions"></a>

### SetupOptions\<Props, Events\>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="emit" href="#emit">emit</a>: [`EventEmitter`](#eventemitter)\<`Events`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="state" href="#state">state</a>: [`SignalState`](#signalstate)\<`Props`\></code>

</dt>

</dl>

---

<a id="signal"></a>

### Signal\<T\>

A mutable signal that can be used to manage reactive state changes.

#### Accessors

<dl>

<dt>

<code data-typedoc-code>set <i></i> <a id="value-1" href="#value-1">value</a>(`value`): `void`</code>

</dt>

<dd>

###### Deprecated

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="get-2" href="#get-2">get</a>(): `T`</code>

</dt>

<dd>

Get the signal's current value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="peek-2" href="#peek-2">peek</a>(): `T`</code>

</dt>

<dd>

Get the signal's current value without subscribing.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="set" href="#set">set</a>(`value`): `void`</code>

</dt>

<dd>

Set the value of the signal.

</dd>

</dl>

---

<a id="typedeventtarget"></a>

### TypedEventTarget\<EventType\>

An interface thats can be used to register event listeners.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="addeventlistener" href="#addeventlistener">addEventListener</a>: (`type`, `listener`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="removeeventlistener" href="#removeeventlistener">removeEventListener</a>: (`type`, `listener`) => `void`</code>

</dt>

</dl>

## Type Aliases

<a id="baseelementconstructor-1"></a>

### BaseElementConstructor()\<Props\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="baseelementconstructor-1" href="#baseelementconstructor-1">BaseElementConstructor</a>\<Props\> = () => [`BaseElement`](#baseelement) & `Props`</code>

</dt>

</dl>

---

<a id="eventdeclaration"></a>

### EventDeclaration

<code data-typedoc-code><i></i> type <a id="eventdeclaration" href="#eventdeclaration">EventDeclaration</a> = \{ `bubbles?`: `boolean`; `cancelable?`: `boolean`; `composed?`: `boolean`; \}</code>

Defines options for an event.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="bubbles" href="#bubbles">bubbles</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the event bubbles.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="cancelable" href="#cancelable">cancelable</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the event is cancelable.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="composed" href="#composed">composed</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the event is composed.

###### Default

`false`

</dd>

</dl>

---

<a id="eventdeclarations"></a>

### EventDeclarations\<Events\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="eventdeclarations" href="#eventdeclarations">EventDeclarations</a>\<Events\> = `{ [EventType in keyof Required<Events>]: EventDeclaration }`</code>

</dt>

<dd>

Map of event types to EventDeclaration options.

</dd>

</dl>

---

<a id="eventemitter"></a>

### EventEmitter()\<Events, EventType\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="eventemitter" href="#eventemitter">EventEmitter</a>\<Events, EventType\> = (`type`, `detail`) => `void`</code>

</dt>

</dl>

---

<a id="propdeclaration"></a>

### PropDeclaration\<T\>

<code data-typedoc-code><i></i> type <a id="propdeclaration" href="#propdeclaration">PropDeclaration</a>\<T\> = \{ `attribute?`: `boolean` \| `string`; `default`: `T`; `fromAttribute?`: (`value`) => `T`; `toAttribute?`: (`value`) => `string` \| `null`; \}</code>

Defines options for a property.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="attribute" href="#attribute">attribute</a><i>?</i>: `boolean` \| `string`</code>

</dt>

<dd>

Indicates how and whether the property becomes an observed attribute. If the value is `false`, the property is not added to `observedAttributes`. If true or absent, the kebab-case version of the property name is observed (e.g. `fooBar` becomes `foo-bar`). If a string, the string value is observed (e.g `attribute: 'custom-foo-bar'`).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="default" href="#default">default</a>: `T`</code>

</dt>

<dd>

The default value of the property.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="fromattribute" href="#fromattribute">fromAttribute</a><i>?</i>: (`value`) => `T`</code>

</dt>

<dd>

Called to convert an attribute value to a property value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="toattribute" href="#toattribute">toAttribute</a><i>?</i>: (`value`) => `string` \| `null`</code>

</dt>

<dd>

Called to convert a property value to an attribute value.

</dd>

</dl>

---

<a id="propdeclarations"></a>

### PropDeclarations\<T\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="propdeclarations" href="#propdeclarations">PropDeclarations</a>\<T\> = `{ [K in keyof Required<T>]: PropDeclaration<T[K]> }`</code>

</dt>

<dd>

Map of props to PropDeclaration options.

</dd>

</dl>

## Functions

<a id="definecustomelement"></a>

### defineCustomElement()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="definecustomelement" href="#definecustomelement">defineCustomElement</a>\<Props, Events\>(`options`): [`BaseElementConstructor`](#baseelementconstructor-1)\<`Props`\></code>

</dt>

<dd>

Defines a custom element constructor.

</dd>

</dl>

---

<a id="defineemit"></a>

### defineEmit()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="defineemit" href="#defineemit">defineEmit</a>\<Events\>(`element`, `events`): (`type`, `detail`) => `void`</code>

</dt>

</dl>

---

<a id="getstatefromprops"></a>

### getStateFromProps()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="getstatefromprops" href="#getstatefromprops">getStateFromProps</a>\<Props\>(`props`): [`SignalState`](#signalstate)\<`Props`\></code>

</dt>

</dl>

---

<a id="registercustomelement"></a>

### registerCustomElement()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="registercustomelement" href="#registercustomelement">registerCustomElement</a>(`name`, `element`): `void`</code>

</dt>

<dd>

Adds the given custom element to the custom element registry.

</dd>

</dl>

## Contexts

<a id="context"></a>

### Context\<T\>

A context is a way to provide and consume signals in a HTML tree.

#### Methods

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="consume" href="#consume">consume</a>(`element`): [`Signal`](#signal)\<`T`\></code>

</dt>

<dd>

Receives the signal from a parent element.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="provide" href="#provide">provide</a>(`element`, `signal`): `void`</code>

</dt>

<dd>

Provides a signal to all children of the element.

</dd>

</dl>

---

<a id="createcontext"></a>

### createContext()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="createcontext" href="#createcontext">createContext</a>\<T\>(`key`, `defaultValue`): [`Context`](#context)\<`T`\></code>

</dt>

<dd>

Creates a new context.

</dd>

</dl>

## DOM

<a id="useanimationframe"></a>

### useAnimationFrame()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useanimationframe" href="#useanimationframe">useAnimationFrame</a>(`element`, `effect`): () => `void`</code>

</dt>

<dd>

Executes an effect in the next animation frame.

The given `effect` function will be called when the element is connected, and when the dependencies change afterward.

`effect` could return a function `callback`. `callback` will be called in the next animation frame.

`callback` could return a function `dispose`. `dispose` will be called when the effect is disposed.

</dd>

</dl>

---

<a id="useariaattribute"></a>

### useAriaAttribute()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useariaattribute" href="#useariaattribute">useAriaAttribute</a>\<K\>(`element`, `key`, `compute`): `VoidFunction`</code>

</dt>

<dd>

Sets the computed attribute of the element when it's connected.

This is a TypeScript type-safe version of [useAttribute](#useattribute).

</dd>

</dl>

---

<a id="useariarole"></a>

### useAriaRole()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useariarole" href="#useariarole">useAriaRole</a>(`element`, `role`): `VoidFunction`</code>

</dt>

<dd>

Sets the `role` attribute of the element when it's connected.

You can pass a string or a compute function that returns a string.

</dd>

</dl>

---

<a id="useattribute"></a>

### useAttribute()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useattribute" href="#useattribute">useAttribute</a>(`element`, `key`, `compute`): `VoidFunction`</code>

</dt>

<dd>

Sets the computed attribute of the element when it's connected.

</dd>

</dl>

---

<a id="useeventlistener"></a>

### useEventListener()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useeventlistener" href="#useeventlistener">useEventListener</a>\<K\>(`element`, `type`, `listener`, `options?`): `VoidFunction`</code>

</dt>

<dd>

Registers an event listener on the element.

</dd>

</dl>

---

<a id="usequeryselector"></a>

### useQuerySelector()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="usequeryselector" href="#usequeryselector">useQuerySelector</a>\<E\>(`element`, `selector`, `options`): [`ReadonlySignal`](#readonlysignal)\<`null` \| `E`\></code>

</dt>

<dd>

Returns the first element matching the given selector.

</dd>

</dl>

---

<a id="usequeryselectorall"></a>

### useQuerySelectorAll()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="usequeryselectorall" href="#usequeryselectorall">useQuerySelectorAll</a>\<E\>(`element`, `selector`, `options`): [`ReadonlySignal`](#readonlysignal)\<`NodeListOf`\<`E`\>\></code>

</dt>

<dd>

Returns all elements matching the given selector.

</dd>

</dl>

---

<a id="usestyle"></a>

### useStyle()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="usestyle" href="#usestyle">useStyle</a>\<K\>(`element`, `key`, `compute`): `VoidFunction`</code>

</dt>

<dd>

Sets the computed style of the element when it's connected.

</dd>

</dl>

## Elements

<a id="baseelement"></a>

### BaseElement

Base class for all custom elements in Aria UI. It implements the [ConnectableElement](#connectableelement) interface.

#### Constructors

<a id="constructor"></a>

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor" href="#constructor">BaseElement</a>(): [`BaseElement`](#baseelement)</code>

</dt>

</dl>

---

<a id="connectableelement"></a>

### ConnectableElement

Any HTML element that has implemented the `addConnectedCallback` method.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="addconnectedcallback" href="#addconnectedcallback">addConnectedCallback</a>: (`callback`) => `void`</code>

</dt>

<dd>

Registers a callback to be called when the element is connected to the DOM. This callback can return a cleanup function that will be called when the element is disconnected from the DOM.

</dd>

</dl>

## Props and States

<a id="signalstate"></a>

### SignalState\<T\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="signalstate" href="#signalstate">SignalState</a>\<T\> = `{ [K in keyof Required<T>]: Signal<T[K]> }`</code>

</dt>

<dd>

A plain object containing signals.

</dd>

</dl>

---

<a id="assignprops"></a>

### assignProps()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="assignprops" href="#assignprops">assignProps</a>\<T\>(`defaultProps`, `props?`): `Readonly`\<`T`\></code>

</dt>

<dd>

Merges two objects, with the second object taking precedence. Only keys present in the first object will be included in the result.

</dd>

</dl>

---

<a id="mapsignals"></a>

### ~~mapSignals()~~

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="mapsignals" href="#mapsignals">mapSignals</a>\<T\>(`values`): [`SignalState`](#signalstate)\<`T`\></code>

</dt>

<dd>

Maps every value in the given object to a signal.

#### Deprecated

</dd>

</dl>

---

<a id="mapvalues"></a>

### ~~mapValues()~~

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="mapvalues" href="#mapvalues">mapValues</a>\<T\>(`signals`): `T`</code>

</dt>

<dd>

Maps every signal in the given object to its current value.

#### Deprecated

</dd>

</dl>

## Signals

<a id="signalvalue-1"></a>

### SignalValue\<S\>

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="signalvalue-1" href="#signalvalue-1">SignalValue</a>\<S\> = `S` _extends_ [`Signal`](#signal)\<infer T\> ? `T` : `never`</code>

</dt>

<dd>

Extracts the value type from a signal type.

</dd>

</dl>

---

<a id="batch"></a>

### batch()

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="batch" href="#batch">batch</a>: \<`T`\>(`fn`) => `T` = `_batch`</code>

</dt>

<dd>

Groups multiple signal updates into a single batch, optimizing performance by reducing the number of updates.

This is a re-export of `batch` from `@preact/signals-core`.

</dd>

</dl>

---

<a id="untracked"></a>

### untracked()

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="untracked" href="#untracked">untracked</a>: \<`T`\>(`fn`) => `T` = `_untracked`</code>

</dt>

<dd>

Executes a given computation without automatically tracking its dependencies, useful for avoiding unnecessary re-computations.

This is a re-export of `untracked` from `@preact/signals-core`.

</dd>

</dl>

---

<a id="createcomputed"></a>

### createComputed()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="createcomputed" href="#createcomputed">createComputed</a>\<T\>(`fn`): [`ReadonlySignal`](#readonlysignal)\<`T`\></code>

</dt>

<dd>

Creates a computed signal that automatically updates its value based on the reactive dependencies it uses. Computed signals are read-only and are used to derive state from other signals, recalculating their value when dependencies change.

</dd>

</dl>

---

<a id="createsignal"></a>

### createSignal()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="createsignal" href="#createsignal">createSignal</a>\<T\>(`value`): [`Signal`](#signal)\<`T`\></code>

</dt>

<dd>

Creates and returns a new signal with the given initial value. Signals are reactive data sources that can be read and written to, allowing components to reactively update when their values change.

</dd>

</dl>

---

<a id="useeffect"></a>

### useEffect()

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="useeffect" href="#useeffect">useEffect</a>(`element`, `callback`): () => `void`</code>

</dt>

<dd>

Registers a callback to be called when the given element is connected to the DOM. It will track which signals are accessed and re-run their callback when those signals change. The callback can return a cleanup function that will be called when the effect is destroyed.

The effect will be destroyed and all signals it was subscribed to will be unsubscribed from, when the element is disconnected from the DOM. You can also manually destroy the effect by calling the returned function.

</dd>

</dl>

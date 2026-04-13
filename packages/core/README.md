# @aria-ui/core

A tiny framework for building **light-DOM** Web Components with a signal-based reactive runtime.

`@aria-ui/core` is the foundation that [`@aria-ui/elements`](https://www.npmjs.com/package/@aria-ui/elements) is built on. You can also use it directly to author your own custom elements without pulling in a full UI framework.

**Playground:** [https://aria-ui.pages.dev/](https://aria-ui.pages.dev/) — see what `@aria-ui/core` powers.

## Features

- **Light DOM only.** Components render into the regular DOM tree, so global CSS, Tailwind classes, and `[aria-*]` / `[data-*]` selectors all work out of the box.
- **Signal-based reactivity** powered by [`alien-signals`](https://github.com/stackblitz/alien-signals). Each prop is a signal; effects automatically track their dependencies.
- **Attribute / property / event interop.** Props are exposed simultaneously as HTML attributes, JS properties, and reactive signals, with bidirectional synchronization.
- **Lit-style reactive controllers.** `HostElement` implements the `ReactiveControllerHost` protocol so you can attach controllers to the connected/disconnected lifecycle.
- **Built-in dependency injection** via `createContext`, implemented with bubbling DOM events so providers and consumers can live anywhere in the light-DOM tree.
- **SSR-safe.** `HostElement` extends a shim from `server-dom-shim`, and `registerCustomElement` is a no-op outside the browser.

## Installation

```bash
npm install @aria-ui/core
# or
pnpm add @aria-ui/core
```

## Quick start

```ts
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type HostElement,
  type State,
} from '@aria-ui/core'

interface CounterProps {
  count: number
}

const counterProps = defineProps<CounterProps>({
  count: { default: 0, attribute: 'count', type: 'number' },
})

function setupCounter(host: HostElement, state: State<CounterProps>) {
  useEffect(host, () => {
    host.textContent = String(state.count.get())
  })

  onMount(host, () => {
    const handler = () => state.count.set(state.count.get() + 1)
    host.addEventListener('click', handler)
    return () => host.removeEventListener('click', handler)
  })
}

export class CounterElement extends defineCustomElement(setupCounter, counterProps) {}

registerCustomElement('my-counter', CounterElement)
```

```html
<my-counter count="5"></my-counter>
```

The element exposes `count` both as an HTML attribute and as a JS property:

```ts
const el = document.querySelector('my-counter')!
el.count = 10
console.log(el.count) // 10
```

## API overview

### Defining custom elements

| Export                              | Description                                                                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defineProps<Props>(declaration)`   | Declare a typed set of props. Each entry specifies `default`, `attribute` (string name or `false`), and `type` (`'boolean' \| 'string' \| 'number' \| 'json'`). |
| `defineCustomElement(setup, props)` | Create a custom element class. Returns a constructor that extends `HostElement` and exposes each prop as a getter/setter.                                       |
| `registerCustomElement(name, ctor)` | Idempotent wrapper around `customElements.define`. Safe to call multiple times and on the server.                                                               |
| `HostElement`                       | Base class for custom elements. Implements the `ReactiveControllerHost` protocol.                                                                               |

### Reactivity

| Export                          | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `createSignal<T>(initial)`      | Create a `{ get, set }` signal.                                                                    |
| `createState(propsDeclaration)` | Create a `State<Props>`, i.e. a record of signals from a props declaration.                        |
| `computed(fn)`                  | Re-exported from `alien-signals`. Build a derived value that updates when its dependencies change. |
| `useEffect(host, callback)`     | Run an effect tied to the host's connected lifecycle. The callback may return a cleanup function.  |
| `onMount(host, callback)`       | Run a one-shot callback when the host is connected. The callback may return a cleanup function.    |

### Dependency injection

| Export                  | Description                                                                      |
| ----------------------- | -------------------------------------------------------------------------------- |
| `createContext<T>(key)` | Create a context object with `provide(host, value)` and `consume(host)` methods. |

`createContext` is implemented with bubbling DOM events, so providers and consumers do not need to know about each other directly — any descendant element can consume a value provided by an ancestor.

```ts
import { createContext, type Context } from '@aria-ui/core'

interface CounterStore {
  count: () => number
  increment: () => void
}

export const CounterContext: Context<CounterStore> = createContext('counter')

// Inside a parent setup function:
CounterContext.provide(host, store)

// Inside a child setup function:
const getStore = CounterContext.consume(host)
useEffect(host, () => {
  const store = getStore()
  if (store) host.textContent = String(store.count())
})
```

## License

MIT

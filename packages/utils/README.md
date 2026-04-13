# @aria-ui/utils

Reusable hooks and helpers for building accessible Web Components on top of [`@aria-ui/core`](https://www.npmjs.com/package/@aria-ui/core).

This package provides the building blocks that [`@aria-ui/elements`](https://www.npmjs.com/package/@aria-ui/elements) uses internally — ARIA attribute reflection, collection navigation, pointer/keyboard interaction, presence and transition tracking, and more. You can use it to author your own custom elements that follow the same patterns.

## Installation

```bash
npm install @aria-ui/core @aria-ui/utils
# or
pnpm add @aria-ui/core @aria-ui/utils
```

## API overview

### ARIA reflection hooks

Each hook subscribes to a getter and writes the result to the corresponding ARIA attribute on the host element. They are tiny effects, but using them keeps your setup functions declarative and consistent.

| Hook                                 | Reflects to             |
| ------------------------------------ | ----------------------- |
| `useAriaDisabled(host, get)`         | `aria-disabled`         |
| `useAriaExpanded(host, get)`         | `aria-expanded`         |
| `useAriaSelected(host, get)`         | `aria-selected`         |
| `useAriaControls(host, get)`         | `aria-controls`         |
| `useAriaDescribedBy(host, get)`      | `aria-describedby`      |
| `useAriaMultiselectable(host, get)`  | `aria-multiselectable`  |
| `useAriaOrientation(host, get)`      | `aria-orientation`      |
| `useAriaActivedescendant(host, get)` | `aria-activedescendant` |
| `useAriaHasPopup(host, get)`         | `aria-haspopup`         |

Plus low-level helpers `getAriaHasPopup(element)` and `setAriaHasPopup(element, value)`.

```ts
import { useAriaDisabled, useAriaExpanded } from '@aria-ui/utils'

function setupTrigger(host, props) {
  useAriaDisabled(host, () => props.disabled.get())
  useAriaExpanded(host, () => props.open.get())
}
```

### Collections

Collection helpers let you build composite widgets — listboxes, menus, comboboxes — where a parent element coordinates a set of item elements.

| Export                                                                                              | Description                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Collection`                                                                                        | An ordered set of items keyed by `value`, sorted by DOM position.                                                                                                   |
| `getCollectionItemValue(element)`                                                                   | Read the `value` of a collection item.                                                                                                                              |
| `createCollectionStore()`                                                                           | Create a store with `getCollection()`, `getHighlightedValue()`, `setHighlightedValue()`, `first()`, etc. Designed to be embedded inside your component's own store. |
| `setupCollectionItem(host, props, getStore, getVisible?)`                                           | Register an item element with its parent collection store. Handles registration, ID assignment, and the `data-active` attribute.                                    |
| `handleCollectionNavigation(event, collection, getHighlighted, setHighlighted, orientation, loop?)` | Process a `keydown` event for ArrowUp/Down/Left/Right/Home/End and update the highlighted value. Returns `true` if the event was handled.                           |

### Pointer and keyboard interaction

| Hook                                                         | Description                                                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `useEventListener(host, type, listener, options?)`           | Add a DOM event listener that is automatically removed when the host disconnects.                        |
| `useGlobalEventListener(host, type, listener)`               | Add a `window` event listener tied to the host's connected lifecycle, deduplicated across hosts.         |
| `usePress(host, onPress)`                                    | Unified press handler that fires for mouse, touch, and keyboard (Enter/Space) activation.                |
| `useHover(host, { openDelay, closeDelay, onOpen, onClose })` | Hover tracking with configurable open/close delays. Used by popovers and tooltips.                       |
| `usePresence(host, present)`                                 | Track whether the host should be present in the DOM, with hooks for unmount-after-animation behavior.    |
| `useTransitionStatus(host, present)`                         | Track CSS transition status (`'entering'`, `'entered'`, `'exiting'`, `'exited'`) for animating overlays. |
| `useDisabledMountTransitionStyle(host)`                      | Disable CSS transitions during the initial mount, to avoid a flash on first paint.                       |
| `createDelayedToggle({ openDelay, closeDelay })`             | Standalone delayed open/close state machine.                                                             |

### Identity and attributes

| Hook                            | Description                                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useElementId(host)`            | Assign a stable, unique `id` to the host element if it doesn't already have one. Returns the id. Useful for `aria-activedescendant` and `aria-controls`. |
| `useAttribute(host, name, get)` | Reflect a value to an arbitrary HTML attribute.                                                                                                          |
| `useDataState(host, get)`       | Reflect a state string to `data-state`.                                                                                                                  |

### Feature detection

| Export                      | Description                         |
| --------------------------- | ----------------------------------- |
| `FeatureDetection`          | Public feature detection helpers.   |
| `FeatureDetectionInternals` | Internal feature detection helpers. |

### Re-exports

For convenience, this package also re-exports `getNearestOverflowAncestor` from `@zag-js/dom-query`.

## Example: a minimal listbox item

```ts
import {
  defineCustomElement,
  defineProps,
  onMount,
  type HostElement,
  type State,
} from '@aria-ui/core'
import { setupCollectionItem, useAriaSelected, useEventListener } from '@aria-ui/utils'

import { MyListboxContext } from './my-listbox-context'

interface ItemProps {
  value: string
}

const itemProps = defineProps<ItemProps>({
  value: { default: '', attribute: 'value', type: 'string' },
})

function setupItem(host: HostElement, props: State<ItemProps>) {
  onMount(host, () => {
    host.role = 'option'
  })

  const getStore = MyListboxContext.consume(host)

  setupCollectionItem(host, props, getStore)

  useAriaSelected(host, () => {
    return getStore()?.selectedValues.get().includes(props.value.get()) ?? false
  })

  useEventListener(host, 'click', () => {
    getStore()?.toggle(props.value.get())
  })
}

export class MyItemElement extends defineCustomElement(setupItem, itemProps) {}
```

## License

MIT

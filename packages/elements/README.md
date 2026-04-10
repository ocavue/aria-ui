# @aria-ui/elements

A set of unstyled, accessible **Light-DOM-Only Web Components** for building user interfaces. Inspired by Radix UI and Ark UI, but shipped as native custom elements that work in any framework — or in plain HTML.

**Playground:** [https://aria-ui.pages.dev/](https://aria-ui.pages.dev/)

## Features

- **Light DOM only.** No Shadow DOM, so your global stylesheet, Tailwind classes, and selectors like `[aria-selected="true"]` or `[data-active]` apply directly to the elements you put on the page.
- **Unstyled by design.** Every component ships zero CSS. State is exposed via standard ARIA attributes and `data-*` attributes for you to style however you like.
- **Built on the WAI-ARIA APG.** Keyboard interactions, focus management, and ARIA roles follow the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) patterns.
- **Composable parts.** Each component is split into focused custom elements (`*-root`, `*-trigger`, `*-popup`, `*-positioner`, `*-item`, …) that communicate through a shared store.
- **Framework-agnostic.** Use the elements directly in HTML, or generate framework wrappers with [`@aria-ui/cli`](https://www.npmjs.com/package/@aria-ui/cli) for React, Vue, Solid, Preact, and Svelte.

## Components

| Component   | Custom elements                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Listbox** | `aria-ui-listbox-root`, `aria-ui-listbox-item`, `aria-ui-listbox-empty`                                                                                                        |
| **Menu**    | `aria-ui-menu-root`, `aria-ui-menu-trigger`, `aria-ui-menu-positioner`, `aria-ui-menu-popup`, `aria-ui-menu-item`, `aria-ui-menu-submenu-root`, `aria-ui-menu-submenu-trigger` |
| **Popover** | `aria-ui-popover-root`, `aria-ui-popover-trigger`, `aria-ui-popover-positioner`, `aria-ui-popover-popup`                                                                       |
| **Tooltip** | `aria-ui-tooltip-root`, `aria-ui-tooltip-trigger`, `aria-ui-tooltip-positioner`, `aria-ui-tooltip-popup`                                                                       |

## Installation

```bash
npm install @aria-ui/elements
# or
pnpm add @aria-ui/elements
```

## Quick start

Register every component with a single call:

```ts
import { registerElements } from '@aria-ui/elements'

registerElements()
```

Then use the elements anywhere in your HTML:

```html
<aria-ui-popover-root>
  <aria-ui-popover-trigger tabindex="0">Open popover</aria-ui-popover-trigger>
  <aria-ui-popover-positioner>
    <aria-ui-popover-popup>
      <p>Hello from a popover!</p>
    </aria-ui-popover-popup>
  </aria-ui-popover-positioner>
</aria-ui-popover-root>
```

### Listbox example

```html
<aria-ui-listbox-root>
  <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
  <aria-ui-listbox-item value="banana">Banana</aria-ui-listbox-item>
  <aria-ui-listbox-item value="cherry">Cherry</aria-ui-listbox-item>
</aria-ui-listbox-root>
```

```ts
const listbox = document.querySelector('aria-ui-listbox-root')!
listbox.addEventListener('valueChange', (event) => {
  console.log('Selected:', event.detail)
})
```

### Menu example

```html
<aria-ui-menu-root>
  <aria-ui-menu-trigger tabindex="0">Actions</aria-ui-menu-trigger>
  <aria-ui-menu-positioner>
    <aria-ui-menu-popup>
      <aria-ui-menu-item value="cut">Cut</aria-ui-menu-item>
      <aria-ui-menu-item value="copy">Copy</aria-ui-menu-item>
      <aria-ui-menu-item value="paste">Paste</aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

## Tree-shakable subpath imports

Each component is also published under its own subpath, so you can register only the parts you need:

```ts
import { registerListboxRootElement, registerListboxItemElement } from '@aria-ui/elements/listbox'

registerListboxRootElement()
registerListboxItemElement()
```

Available entry points:

- `@aria-ui/elements` — full bundle plus `registerElements()`
- `@aria-ui/elements/listbox`
- `@aria-ui/elements/menu`
- `@aria-ui/elements/popover`
- `@aria-ui/elements/tooltip`
- `@aria-ui/elements/overlay` — shared overlay primitives

## Setting props

Every prop is available as both an HTML attribute and a JS property. Complex values (arrays, objects, `null`) are stored as JSON:

```html
<!-- Via attributes -->
<aria-ui-listbox-root multiple values='["apple","banana"]'>
  <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
  <aria-ui-listbox-item value="banana">Banana</aria-ui-listbox-item>
</aria-ui-listbox-root>
```

```ts
// Via JS properties
const listbox = document.querySelector('aria-ui-listbox-root')!
listbox.multiple = true
listbox.values = ['apple', 'banana']
```

## Styling

Components expose their state through standard accessibility attributes and a few `data-*` attributes:

| Attribute                       | Used by                       | Meaning                                                                   |
| ------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `aria-selected="true"`          | listbox items                 | The option is selected                                                    |
| `aria-expanded="true"`          | popover/menu/tooltip triggers | The overlay is open                                                       |
| `aria-disabled="true"`          | any element                   | The element is disabled                                                   |
| `data-active`                   | listbox items, menu items     | The element is the currently highlighted option (`aria-activedescendant`) |
| `data-state="open" \| "closed"` | overlay popups                | Overlay open state, useful for transitions                                |

Example with Tailwind:

```html
<aria-ui-listbox-item
  value="apple"
  class="block px-3 py-2 cursor-pointer hover:bg-blue-50 aria-selected:bg-blue-100 data-active:outline-2 data-active:outline-blue-500"
>
  Apple
</aria-ui-listbox-item>
```

## Events

Components dispatch standard DOM events whose payload lives on the `detail` property:

| Event          | Dispatched by           | `detail`     |
| -------------- | ----------------------- | ------------ |
| `valueChange`  | listbox (single select) | `string`     |
| `valuesChange` | listbox (multi-select)  | `string[]`   |
| `openChange`   | popover, menu, tooltip  | `boolean`    |
| `select`       | menu item, listbox item | (no payload) |

`valueChange` / `valuesChange` are cancelable — call `event.preventDefault()` to take over the state yourself and run the listbox in a controlled mode.

## Using with frameworks

For React, Vue, Solid, Preact, and Svelte you can generate typed wrapper components with [`@aria-ui/cli`](https://www.npmjs.com/package/@aria-ui/cli), which handles attribute/property mapping and converts DOM events into idiomatic framework callbacks.

## License

MIT

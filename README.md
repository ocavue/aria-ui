# Aria UI

An open-source collection of unstyled, accessible Web Components and tools for building inclusive user interfaces.

**Playground:** [https://aria-ui.pages.dev/](https://aria-ui.pages.dev/)

## What's inside

Aria UI is a monorepo of focused, composable packages. Every component is a native **light-DOM custom element**, so it works in plain HTML, in any framework, and with any styling solution you already use.

| Package                                    | Description                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [`@aria-ui/elements`](./packages/elements) | Unstyled, accessible Web Components: listbox, menu, popover, tooltip.                           |
| [`@aria-ui/core`](./packages/core)         | Tiny framework for authoring light-DOM Web Components with a signal-based reactive runtime.     |
| [`@aria-ui/utils`](./packages/utils)       | Hooks and helpers for ARIA reflection, collection navigation, and pointer/keyboard interaction. |
| [`@aria-ui/cli`](./packages/cli)           | CLI that generates typed wrapper components for React, Vue, Solid, Preact, and Svelte.          |

## Highlights

- **Light DOM only.** No Shadow DOM, so global CSS, Tailwind, and `[aria-*]` / `[data-*]` selectors all work directly.
- **Unstyled by design.** Components ship zero CSS and expose their state through standard ARIA attributes and a few `data-*` hooks for you to style however you like.
- **Built on the WAI-ARIA APG.** Roles, focus management, and keyboard interactions follow the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/).
- **Framework-agnostic.** Use the elements directly in HTML, or generate idiomatic wrappers with `@aria-ui/cli`.
- **Composable parts.** Each component is split into focused custom elements (`*-root`, `*-trigger`, `*-popup`, `*-positioner`, `*-item`, …) that talk to each other through a shared store.

## Quick start

```bash
npm install @aria-ui/elements
```

```ts
import { registerElements } from '@aria-ui/elements'

registerElements()
```

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

See each package's README for the full API, and try the components live in the [playground](https://aria-ui.pages.dev/).

## Contributing

This is a [pnpm](https://pnpm.io/) monorepo.

```bash
pnpm install
pnpm build       # build all packages
pnpm test        # run vitest browser tests (Playwright + Chromium)
pnpm dev         # start the playground (Astro)
pnpm change      # create a changeset for your PR
```

Releases are managed with [Changesets](https://github.com/changesets/changesets). Add a changeset (`pnpm change`) describing your change in any PR that touches a published package.

## License

[MIT](./LICENSE)

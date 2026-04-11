# Documentation Conventions

## Element Class JSDoc

Each custom element class (e.g. `TooltipRootElement`, `PopoverTriggerElement`) must have a JSDoc comment above it with the following structure:

1. `@public` tag
2. Backticked custom element tag name followed by "custom element."
3. **Properties** — `{@link}` to the corresponding Props type.
4. **Events** — `{@link}` to the Events type. Omit this line if the element does not emit custom events.
5. **Data attributes** — A markdown table listing `data-*` attributes. Omit this section if the element does not expose any `data-*` attributes.

### Template

```ts
/**
 * @public
 *
 * `<aria-ui-xxx-yyy>` custom element.
 *
 * Properties: {@link XxxYyyProps}
 *
 * Events: {@link XxxYyyEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 */
export class XxxYyyElement {}
```

### Rules

- Only include `data-*` attributes. Do not list `role` or `aria-*` attributes — those are internal implementation details that users do not need to care about.
- Omit the "Events" line if the element does not emit any custom events.
- Omit the "Data attributes" section entirely if the element does not expose any `data-*` attributes.

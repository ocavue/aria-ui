# @aria-ui/menu

## Functions

### useMenuTrigger()

```ts
function useMenuTrigger(element: ConnectableElement): object;
```

## MenuContent

### MenuContentElement

A custom MenuContent element.

```ts
new MenuContentElement(): MenuContentElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>true</code> |
| `autoUpdate` | `boolean` \| `Partial`\<`object`\> | <p>Options to activate auto-update listeners</p><p>**See**</p><p>https://floating-ui.com/docs/autoUpdate</p><p>**Default**</p><code>true</code> |
| `boundary` | `Boundary` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'clippingAncestors'</code> |
| `elementContext` | `ElementContext` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'floating'</code> |
| `fitViewport` | `boolean` | <p>Whether to constrain the floating element's width and height to not exceed the viewport.</p><p>**Default**</p><code>false</code> |
| `flip` | `boolean` \| `Placement`[] | <p>Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit.</p><p>**Default**</p><code>true</code> |
| `hide` | `boolean` | <p>Whether to hide the floating element when the reference element or the floating element is fully clipped.</p><p>**Default**</p><code>false</code> |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`.<p>**Default**</p><code>true</code> |
| `inline` | `boolean` | <p>Whether to improve positioning for inline reference elements that span over multiple lines.</p><p>**Default**</p><code>false</code> |
| `offset` | `null` \| `OffsetOptions` | <p>The distance between the reference and floating element.</p><p>**Default**</p><code>4</code> |
| `onEscapeKeyDown` | `null` \| (`event`: `KeyboardEvent`) => `void` | <p>Event handler called when the escape key is pressed.</p><p>By default, the popover will be closed. It can be prevented by calling `event.preventDefault`.</p> |
| `onFocusOutside` | `null` \| (`event`: `FocusOutsideEvent`) => `void` | <p>Event handler called when the focus is moved outside the element.</p><p>By default, the popover will be closed. It can be prevented by calling `event.preventDefault`.</p> |
| `onInteractOutside` | `null` \| (`event`: `InteractOutsideEvent`) => `void` | <p>Function called when an interaction (pointer or focus) happens outside the component.</p><p>By default, the popover will be closed. It can be prevented by calling `event.preventDefault`.</p> |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | <p>By default, the menu element will listen for keydown events. However, you can pass `onKeydownHandlerAdd` to override the default behavior. `onKeydownHandlerAdd` receives a keydown handler when the Menu element is mounted, and returns a function that will be called when the Menu element is unmounted.</p><p>**Default**</p><code>null</code> |
| `onPointerDownOutside` | `null` \| (`event`: `PointerDownOutsideEvent`) => `void` | <p>Event handler called when the pointer is pressed down outside the element.</p><p>By default, the popover will be closed. It can be prevented by calling `event.preventDefault`.</p> |
| `overflowPadding` | `number` | <p>**Default**</p><code>4</code> |
| `overlap` | `boolean` | <p>Whether the floating element can overlap the reference element to keep it in view.</p><p>**Default**</p><code>false</code> |
| `placement` | `Placement` | <p>The initial placement of the floating element</p><p>**Default**</p><code>"top"</code> |
| `rootBoundary` | `RootBoundary` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'viewport'</code> |
| `sameHeight` | `boolean` | <p>Whether to constrain the floating element's height so that it matches the reference element.</p><p>**Default**</p><code>false</code> |
| `sameWidth` | `boolean` | <p>Whether to constrain the floating element's width so that it matches the reference element.</p><p>**Default**</p><code>false</code> |
| `shift` | `boolean` | <p>Whether the floating element should shift to keep it in view.</p><p>**Default**</p><code>true</code> |
| `strategy` | `"absolute"` \| `"fixed"` | <p>The strategy to use for positioning</p><p>**Default**</p><code>"absolute"</code> |
| `transform` | `boolean` | <p>Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element.</p><p>**Default**</p><code>false</code> |

## MenuItem

### MenuItemElement

A custom MenuItem element.

```ts
new MenuItemElement(): MenuItemElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `filter` | [`ItemFilter`](../collection/README.md#itemfilter) | <p>The filter function to determine if an item should be shown in the listbox.</p><p>**Default**</p><code>defaultItemFilter</code> |
| `onSelect` | `null` \| `VoidFunction` | <p>Callback function that is called when the item is selected.</p><p>**Default**</p><code>null</code> |
| `query` | `string` | <p>The query string to filter the listbox items.</p><p>**Default**</p><code>""</code> |
| `value` | `string` | <p>The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated.</p><p>**Default**</p><code>""</code> |

## MenuRoot

### MenuRootElement

A custom MenuRoot element.

```ts
new MenuRootElement(): MenuRootElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `defaultOpen` | `boolean` | <p>Whether the popover is open by default.</p><p>**Default**</p><code>false</code> |
| `onOpenChange` | `null` \| (`open`: `boolean`) => `void` | <p>Event handler called when the user opens or closes the popover.</p><p>**Default**</p><code>null</code> |
| `open` | `boolean` | <p>Whether the popover is open.</p><p>**Default**</p><code>false</code> |

### MenuRootProps

```ts
type MenuRootProps: PopoverRootProps;
```

## MenuTrigger

### MenuTriggerElement

A custom MenuTrigger element.

```ts
new MenuTriggerElement(): MenuTriggerElement
```

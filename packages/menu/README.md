# @aria-ui/menu

## Functions

### useMenuTrigger()

```ts
function useMenuTrigger(element: ConnectableElement): void;
```

## MenuContent

### MenuContentElement

A custom MenuContent element.

#### Constructors

```ts
new MenuContentElement(): MenuContentElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `altBoundary` | `boolean` | **See** https://floating-ui.com/docs/detectoverflow **Default** `true` |
| `autoUpdate` | `boolean` \| `Partial`\<`object`\> | Options to activate auto-update listeners **See** https://floating-ui.com/docs/autoUpdate **Default** `true` |
| `boundary` | `Boundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'clippingAncestors'` |
| `elementContext` | `ElementContext` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed the viewport. **Default** `false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit. **Default** `true` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the floating element is fully clipped. **Default** `false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`. **Default** `true` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over multiple lines. **Default** `false` |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element. **Default** `4` |
| `onEscapeKeyDown` | `null` \| (`event`: `KeyboardEvent`) => `void` | Event handler called when the escape key is pressed. By default, the popover will be closed. It can be prevented by calling `event.preventDefault`. |
| `onFocusOutside` | `null` \| (`event`: `FocusOutsideEvent`) => `void` | Event handler called when the focus is moved outside the element. By default, the popover will be closed. It can be prevented by calling `event.preventDefault`. |
| `onInteractOutside` | `null` \| (`event`: `InteractOutsideEvent`) => `void` | Function called when an interaction (pointer or focus) happens outside the component. By default, the popover will be closed. It can be prevented by calling `event.preventDefault`. |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | By default, the menu element will listen for keydown events. However, you can pass `onKeydownHandlerAdd` to override the default behavior. `onKeydownHandlerAdd` receives a keydown handler when the Menu element is mounted, and returns a function that will be called when the Menu element is unmounted. **Default** `null` |
| `onPointerDownOutside` | `null` \| (`event`: `PointerDownOutsideEvent`) => `void` | Event handler called when the pointer is pressed down outside the element. By default, the popover will be closed. It can be prevented by calling `event.preventDefault`. |
| `overflowPadding` | `number` | **Default** `4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"top"` |
| `rootBoundary` | `RootBoundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `true` |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning **Default** `"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |

## MenuItem

### MenuItemElement

A custom MenuItem element.

#### Constructors

```ts
new MenuItemElement(): MenuItemElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `filter` | [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. **Default** `defaultItemFilter` |
| `onSelect` | `null` \| `VoidFunction` | Callback function that is called when the item is selected. **Default** `null` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated. **Default** `""` |

## MenuRoot

### MenuRootElement

A custom MenuRoot element.

#### Constructors

```ts
new MenuRootElement(): MenuRootElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `defaultOpen` | `boolean` | Whether the popover is open by default. **Default** `false` |
| `onOpenChange` | `null` \| (`open`: `boolean`) => `void` | Event handler called then the open state changes because of a user interaction. **Default** `null` |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |

### MenuRootProps

```ts
type MenuRootProps: PopoverRootProps;
```

## MenuTrigger

### MenuTriggerElement

A custom MenuTrigger element.

#### Constructors

```ts
new MenuTriggerElement(): MenuTriggerElement
```

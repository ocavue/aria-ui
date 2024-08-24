# @aria-ui/select

## SelectContent

### SelectContentElement

A custom SelectContent element.

#### Constructors

```ts
new SelectContentElement(): SelectContentElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `altBoundary` | `boolean` | **See** https://floating-ui.com/docs/detectoverflow **Default** `true` |
| `autoUpdate` | `boolean` \| `AutoUpdateOptions` | Options to activate auto-update listeners **See** https://floating-ui.com/docs/autoUpdate **Default** `true` |
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
| `onPointerDownOutside` | `null` \| (`event`: `PointerDownOutsideEvent`) => `void` | Event handler called when the pointer is pressed down outside the element. By default, the popover will be closed. It can be prevented by calling `event.preventDefault`. |
| `overflowPadding` | `number` | **Default** `4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"bottom"` |
| `rootBoundary` | `RootBoundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `true` |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning **Default** `"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |

## SelectItem

### SelectItemElement

A custom SelectItem element.

#### Constructors

```ts
new SelectItemElement(): SelectItemElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected. **Default** `null` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |

## SelectList

### SelectListElement

A custom SelectList element.

#### Constructors

```ts
new SelectListElement(): SelectListElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes. **Default** `false` |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown. **Default** `defaultItemFilter` |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | By default, the Listbox element will listen for keydown events. However, you can pass `onKeydownHandlerAdd` to override the default behavior. `onKeydownHandlerAdd` receives a keydown handler when the Listbox element is mounted, and returns a function that will be called when the Listbox element is unmounted. **Default** `null` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode (Currently only single selection mode is implemented) **Default** `"single"` |
| `value` | `string` | The selected value. **Default** `""` |

## SelectRoot

### SelectRootElement

A custom SelectRoot element.

#### Constructors

```ts
new SelectRootElement(): SelectRootElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `defaultOpen` | `boolean` | Whether the popover is open by default. **Default** `false` |
| `onOpenChange` | `null` \| (`open`: `boolean`) => `void` | Event handler called then the open state changes because of a user interaction. **Default** `null` |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |

## SelectTrigger

### SelectTriggerElement

A custom SelectTrigger element.

#### Constructors

```ts
new SelectTriggerElement(): SelectTriggerElement
```

## SelectValue

### SelectValueElement

A custom SelectValue element.

#### Constructors

```ts
new SelectValueElement(): SelectValueElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `placeholder` | `string` | The value to show when no item is selected **Default** `""` |

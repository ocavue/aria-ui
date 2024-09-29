# @aria-ui/popover

## Type Aliases

### EscapeKeyDownEvent

```ts
type EscapeKeyDownEvent: CustomEvent<object>;
```

#### Type declaration

##### originalEvent

```ts
originalEvent: KeyboardEvent;
```

## PopoverContent

### PopoverContentDataAttributes

#### Properties

| Property       | Type                                           |
| -------------- | ---------------------------------------------- |
| `data-align`   | `"center"` \| `"start"` \| `"end"`             |
| `data-mounted` | `""`                                           |
| `data-side`    | `"bottom"` \| `"left"` \| `"right"` \| `"top"` |
| `data-state`   | `"open"` \| `"closed"`                         |

### PopoverContentEvents

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `escapeKeyDown` | [`EscapeKeyDownEvent`](README.md#escapekeydownevent) | Fired when the escape key is pressed. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `focusOutside` | `FocusOutsideEvent` | Fired when the focus is moved outside the element. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `interactOutside` | `InteractOutsideEvent` | Fired when an interaction (pointer or focus) happens outside the component. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `pointerDownOutside` | `PointerDownOutsideEvent` | Fired when the pointer is pressed down outside the element. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |

### PopoverContentProps

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
| `overflowPadding` | `number` | **Default** `4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"top"` |
| `rootBoundary` | `RootBoundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `true` |
| `strategy` | `"fixed"` \| `"absolute"` | The strategy to use for positioning **Default** `"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |

### popoverRootEvents

```ts
const popoverRootEvents: EventDeclarations<PopoverRootEvents>;
```

## PopoverRoot

### PopoverRootEvents

#### Properties

| Property      | Type                       |
| ------------- | -------------------------- |
| `update:open` | `CustomEvent`\<`boolean`\> |

### PopoverRootProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `defaultOpen` | `boolean` | Whether the popover is open by default. **Default** `false` |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |

# @aria-ui/menu

## MenuContent

### MenuContentProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `altBoundary` | `boolean` | Whether to check the alternate elementContext’s boundary. Please see https://floating-ui.com/docs/detectoverflow#altboundary for more information. **Default** `true` |
| `autoUpdate` | `boolean` \| `AutoUpdateOptions` | Options to activate auto-update listeners **See** https://floating-ui.com/docs/autoUpdate **Default** `true` |
| `boundary` | `Boundary` | Describes the clipping element(s) or area that overflow will be checked relative to. Please see https://floating-ui.com/docs/detectoverflow#boundary for more information. **Default** `'clippingAncestors'` |
| `elementContext` | `ElementContext` | The element that will be used to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#elementcontext for more information. **Default** `'floating'` |
| `eventTarget` | `null` \| `HTMLElement` \| [`TypedEventTarget`](../core/README.md#typedeventtargeteventtype)\<`"keydown"`\> | By default, the menu element will listen for keydown events. You can pass a different element to listen for keydown events. **Default** `null` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed the viewport. **Default** `false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit. **Default** `true` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the floating element is fully clipped. **Default** `false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`. **Default** `true` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over multiple lines. **Default** `false` |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element. **Default** `4` |
| `overflowPadding` | `number` | Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information. **Default** `4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"top"` |
| `rootBoundary` | `RootBoundary` | Describes the root boundary that the element will be checked for overflow relative to. Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information. **Default** `'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `true` |
| `strategy` | `"fixed"` \| `"absolute"` | The strategy to use for positioning **Default** `"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |

### MenuContentEvents

```ts
type MenuContentEvents: PopoverContentEvents;
```

## MenuItem

### MenuItemEvents

#### Properties

| Property | Type                    | Description                      |
| -------- | ----------------------- | -------------------------------- |
| `select` | `CustomEvent`\<`void`\> | Fired when the item is selected. |

### MenuItemProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `filter` | [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. **Default** `defaultItemFilter` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated. **Default** `""` |

## MenuRoot

### MenuRootEvents

```ts
type MenuRootEvents: PopoverRootEvents;
```

### MenuRootProps

```ts
type MenuRootProps: PopoverRootProps;
```

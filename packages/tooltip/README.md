# @aria-ui/tooltip

## TooltipContent

### TooltipContentDataAttributes

#### Properties

| Property     | Type                   |
| ------------ | ---------------------- |
| `data-state` | `"open"` \| `"closed"` |

### TooltipContentProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `altBoundary` | `boolean` | Whether to check the alternate elementContext’s boundary. Please see https://floating-ui.com/docs/detectoverflow#altboundary for more information. **Default** `true` |
| `autoUpdate` | `boolean` \| `AutoUpdateOptions` | Options to activate auto-update listeners **See** https://floating-ui.com/docs/autoUpdate **Default** `true` |
| `boundary` | `Boundary` | Describes the clipping element(s) or area that overflow will be checked relative to. Please see https://floating-ui.com/docs/detectoverflow#boundary for more information. **Default** `'clippingAncestors'` |
| `elementContext` | `ElementContext` | The element that will be used to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#elementcontext for more information. **Default** `'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed the viewport. **Default** `false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit. **Default** `"true"` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the floating element is fully clipped. **Default** `false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`. **Default** `"true"` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over multiple lines. **Default** `false` |
| `offset?` | `OffsetOptions` | The distance between the reference and floating element. **Default** `undefined` |
| `overflowPadding` | `number` | Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information. **Default** `0` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"top"` |
| `rootBoundary` | `RootBoundary` | Describes the root boundary that the element will be checked for overflow relative to. Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information. **Default** `'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `false` |
| `strategy` | `"fixed"` \| `"absolute"` | The strategy to use for positioning **Default** `"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |

## TooltipRoot

### TooltipRootEvents

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `openChange` | `CustomEvent`\<`boolean`\> | Fired when the open state changes. |

### TooltipRootProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `closeDelay` | `number` | The delay in milliseconds before the tooltip closes. **Default** `300` |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |
| `openDelay` | `number` | The delay in milliseconds before the tooltip opens. **Default** `700` |

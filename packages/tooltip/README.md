# @aria-ui/tooltip

## TooltipContent

### TooltipContentElement

A custom TooltipContent element.

#### Constructors

```ts
new TooltipContentElement(): TooltipContentElement
```

#### Properties

| Property | Type | Description | Inherited from |
| --- | --- | --- | --- |
| `altBoundary` | `boolean` | **See** https://floating-ui.com/docs/detectoverflow **Default** `true` |  |
| `autoUpdate` | `boolean` \| `Partial`\<`object`\> | Options to activate auto-update listeners **See** https://floating-ui.com/docs/autoUpdate **Default** `true` |  |
| `boundary` | `Boundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'clippingAncestors'` |  |
| `elementContext` | `ElementContext` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'floating'` |  |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed the viewport. **Default** `false` |  |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit. **Default** `false` |  |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the floating element is fully clipped. **Default** `false` |  |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`. **Default** `"true"` |  |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over multiple lines. **Default** `false` |  |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element. **Default** `null` |  |
| `overflowPadding` | `number` | **See** https://floating-ui.com/docs/detectoverflow **Default** `0` |  |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it in view. **Default** `false` |  |
| `placement` | `Placement` | The initial placement of the floating element **Default** `"top"` |  |
| `rootBoundary` | `RootBoundary` | **See** https://floating-ui.com/docs/detectoverflow **Default** `'viewport'` |  |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the reference element. **Default** `false` |  |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the reference element. **Default** `false` |  |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view. **Default** `false` |  |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning **Default** `"absolute"` |  |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element. **Default** `false` |  |

### TooltipContentDataAttributes

#### Properties

| Property     | Type                   |
| ------------ | ---------------------- |
| `data-state` | `"open"` \| `"closed"` |

## TooltipRoot

### TooltipRootElement

A custom TooltipRoot element.

#### Constructors

```ts
new TooltipRootElement(): TooltipRootElement
```

#### Properties

| Property | Type | Description | Inherited from |
| --- | --- | --- | --- |
| `closeDelay` | `number` | The delay in milliseconds before the tooltip closes. **Default** `300` |  |
| `onOpenChange` | `null` \| (`open`: `boolean`) => `void` | Event handler called then the open state changes because of a user interaction. **Default** `null` |  |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |  |
| `openDelay` | `number` | The delay in milliseconds before the tooltip opens. **Default** `700` |  |

## TooltipTrigger

### TooltipTriggerElement

A custom TooltipTrigger element.

#### Constructors

```ts
new TooltipTriggerElement(): TooltipTriggerElement
```

# @aria-ui/tooltip

## TooltipContent

### TooltipContentElement

A custom TooltipContent element.

```ts
new TooltipContentElement(): TooltipContentElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>true</code> |
| `autoUpdate` | `boolean` \| `Partial`\<`object`\> | <p>Options to activate auto-update listeners</p><p>**See**</p><p>https://floating-ui.com/docs/autoUpdate</p><p>**Default**</p><code>true</code> |
| `boundary` | `Boundary` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'clippingAncestors'</code> |
| `elementContext` | `ElementContext` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'floating'</code> |
| `fitViewport` | `boolean` | <p>Whether to constrain the floating element's width and height to not exceed the viewport.</p><p>**Default**</p><code>false</code> |
| `flip` | `boolean` \| `Placement`[] | <p>Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit.</p><p>**Default**</p><code>false</code> |
| `hide` | `boolean` | <p>Whether to hide the floating element when the reference element or the floating element is fully clipped.</p><p>**Default**</p><code>false</code> |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`.<p>**Default**</p><code>"true"</code> |
| `inline` | `boolean` | <p>Whether to improve positioning for inline reference elements that span over multiple lines.</p><p>**Default**</p><code>false</code> |
| `offset` | `null` \| `OffsetOptions` | <p>The distance between the reference and floating element.</p><p>**Default**</p><code>null</code> |
| `overflowPadding` | `number` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>0</code> |
| `overlap` | `boolean` | <p>Whether the floating element can overlap the reference element to keep it in view.</p><p>**Default**</p><code>false</code> |
| `placement` | `Placement` | <p>The initial placement of the floating element</p><p>**Default**</p><code>"top"</code> |
| `rootBoundary` | `RootBoundary` | <p>**See**</p><p>https://floating-ui.com/docs/detectoverflow</p><p>**Default**</p><code>'viewport'</code> |
| `sameHeight` | `boolean` | <p>Whether to constrain the floating element's height so that it matches the reference element.</p><p>**Default**</p><code>false</code> |
| `sameWidth` | `boolean` | <p>Whether to constrain the floating element's width so that it matches the reference element.</p><p>**Default**</p><code>false</code> |
| `shift` | `boolean` | <p>Whether the floating element should shift to keep it in view.</p><p>**Default**</p><code>false</code> |
| `strategy` | `"absolute"` \| `"fixed"` | <p>The strategy to use for positioning</p><p>**Default**</p><code>"absolute"</code> |
| `transform` | `boolean` | <p>Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element.</p><p>**Default**</p><code>false</code> |

### TooltipContentDataAttributes

| Property     | Type                   |
| :----------- | :--------------------- |
| `data-state` | `"open"` \| `"closed"` |

## TooltipRoot

### TooltipRootElement

A custom TooltipRoot element.

```ts
new TooltipRootElement(): TooltipRootElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `closeDelay` | `number` | <p>The delay in milliseconds before the tooltip closes.</p><p>**Default**</p><code>300</code> |
| `openDelay` | `number` | <p>The delay in milliseconds before the tooltip opens.</p><p>**Default**</p><code>700</code> |

## TooltipTrigger

### TooltipTriggerElement

A custom TooltipTrigger element.

```ts
new TooltipTriggerElement(): TooltipTriggerElement
```

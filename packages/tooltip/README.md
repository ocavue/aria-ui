# @aria-ui/tooltip

## TooltipPositioner

### TooltipPositionerElement

A custom TooltipPositioner element.

Properties: [TooltipPositionerProps](README.md#tooltippositionerprops)

```ts
new TooltipPositionerElement(props?: Partial<TooltipPositionerProps>): TooltipPositionerElement
```

### TooltipPositionerDataAttributes

| Property     | Type                   |
| :----------- | :--------------------- |
| `data-state` | `"open"` \| `"closed"` |

### TooltipPositionerProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`true` |
| `autoUpdate` | `boolean` \| `Partial`\<`Object`\> | Options to activate auto-update listeners<br /><br />**See**<br />https://floating-ui.com/docs/autoUpdate<br /><br />**Default**<br />`true` |
| `boundary` | `Boundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'clippingAncestors'` |
| `elementContext` | `ElementContext` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed<br />the viewport.<br /><br />**Default**<br />`false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the<br />preferred placement(s) will overflow the clipping boundary. You can also<br />provide an array of placements to try sequentially if the preferred<br />`placement` does not fit.<br /><br />**Default**<br />`false` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the<br />floating element is fully clipped.<br /><br />**Default**<br />`false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)<br />to place the floating element on top of other page content. When enabled,<br />the floating element won't be clipped by an ancestor. This provides a<br />similar result to React's `<Portals>` or Vue's `<Teleport>`.<br /><br />**Default**<br />`"true"` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over<br />multiple lines.<br /><br />**Default**<br />`false` |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element.<br /><br />**Default**<br />`null` |
| `overflowPadding` | `number` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`0` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it<br />in view.<br /><br />**Default**<br />`false` |
| `placement` | `Placement` | The initial placement of the floating element<br /><br />**Default**<br />`"top"` |
| `rootBoundary` | `RootBoundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view.<br /><br />**Default**<br />`false` |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning<br /><br />**Default**<br />`"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top`<br />and `left` (layout) to place the floating element.<br /><br />**Default**<br />`false` |

### useTooltipPositioner()

```ts
function useTooltipPositioner(
  element: ConnectableElement,
  props?: Partial<TooltipPositionerProps>,
): SingalState<TooltipPositionerProps>;
```

Properties: [TooltipPositionerProps](README.md#tooltippositionerprops)

Data attributes: [TooltipPositionerDataAttributes](README.md#tooltippositionerdataattributes)

## TooltipRoot

### TooltipRootElement

A custom TooltipRoot element.

Properties: [TooltipRootProps](README.md#tooltiprootprops)

```ts
new TooltipRootElement(props?: Partial<TooltipRootProps>): TooltipRootElement
```

### TooltipRootProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `closeDelay` | `number` | The delay in milliseconds before the tooltip closes.<br /><br />**Default**<br />`300` |
| `openDelay` | `number` | The delay in milliseconds before the tooltip opens.<br /><br />**Default**<br />`700` |

### useTooltipRoot()

```ts
function useTooltipRoot(
  element: ConnectableElement,
  props?: Partial<TooltipRootProps>,
): SingalState<TooltipRootProps>;
```

## TooltipTrigger

### TooltipTriggerElement

A custom TooltipTrigger element.

```ts
new TooltipTriggerElement(): TooltipTriggerElement
```

### useTooltipTrigger()

```ts
function useTooltipTrigger(element: ConnectableElement): void;
```

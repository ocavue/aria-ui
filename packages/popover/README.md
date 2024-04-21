# @aria-ui/popover

## OverlayPositioner

### OverlayPositionerProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`true` |
| `autoUpdate` | `boolean` \| `Partial`\<`Object`\> | Options to activate auto-update listeners<br /><br />**See**<br />https://floating-ui.com/docs/autoUpdate<br /><br />**Default**<br />`true` |
| `boundary` | `Boundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'clippingAncestors'` |
| `elementContext` | `ElementContext` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed<br />the viewport.<br /><br />**Default**<br />`false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the<br />preferred placement(s) will overflow the clipping boundary. You can also<br />provide an array of placements to try sequentially if the preferred<br />`placement` does not fit.<br /><br />**Default**<br />`false` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the<br />floating element is fully clipped.<br /><br />**Default**<br />`false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)<br />to place the floating element on top of other page content. When enabled,<br />the floating element won't be clipped by an ancestor. This provides a<br />similar result to React's `<Portals>` or Vue's `<Teleport>`.<br /><br />**Default**<br />`false` |
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

## PopoverContent

### PopoverContentElement

A custom PopoverContent element.

Properties: [PopoverContentProps](README.md#popovercontentprops)

```ts
new PopoverContentElement(props?: Partial<PopoverContentProps>): PopoverContentElement
```

### PopoverContentDataAttributes

| Property     | Type                                           |
| :----------- | :--------------------------------------------- |
| `data-align` | `"center"` \| `"start"` \| `"end"`             |
| `data-side`  | `"bottom"` \| `"left"` \| `"right"` \| `"top"` |
| `data-state` | `"open"` \| `"closed"`                         |

### PopoverContentProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`true` |
| `autoUpdate` | `boolean` \| `Partial`\<`Object`\> | Options to activate auto-update listeners<br /><br />**See**<br />https://floating-ui.com/docs/autoUpdate<br /><br />**Default**<br />`true` |
| `boundary` | `Boundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'clippingAncestors'` |
| `elementContext` | `ElementContext` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed<br />the viewport.<br /><br />**Default**<br />`false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the<br />preferred placement(s) will overflow the clipping boundary. You can also<br />provide an array of placements to try sequentially if the preferred<br />`placement` does not fit.<br /><br />**Default**<br />`true` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the<br />floating element is fully clipped.<br /><br />**Default**<br />`false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)<br />to place the floating element on top of other page content. When enabled,<br />the floating element won't be clipped by an ancestor. This provides a<br />similar result to React's `<Portals>` or Vue's `<Teleport>`.<br /><br />**Default**<br />`true` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over<br />multiple lines.<br /><br />**Default**<br />`false` |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element.<br /><br />**Default**<br />`4` |
| `onEscapeKeyDown` | `null` \| (`event`: `KeyboardEvent`) => `void` | Event handler called when the escape key is pressed.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onFocusOutside` | `null` \| (`event`: `FocusOutsideEvent`) => `void` | Event handler called when the focus is moved outside the element.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onInteractOutside` | `null` \| (`event`: `InteractOutsideEvent`) => `void` | Function called when an interaction (pointer or focus) happens outside the<br />component.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onPointerDownOutside` | `null` \| (`event`: `PointerDownOutsideEvent`) => `void` | Event handler called when the pointer is pressed down outside the element.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `overflowPadding` | `number` | **Default**<br />`4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it<br />in view.<br /><br />**Default**<br />`false` |
| `placement` | `Placement` | The initial placement of the floating element<br /><br />**Default**<br />`"top"` |
| `rootBoundary` | `RootBoundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view.<br /><br />**Default**<br />`true` |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning<br /><br />**Default**<br />`"absolute"` |
| `transform` | `boolean` | Whether to use `transform: translate3d()` for positioning instead of `top`<br />and `left` (layout) to place the floating element.<br /><br />**Default**<br />`false` |

### usePopoverContent()

```ts
function usePopoverContent(
  element: ConnectableElement,
  props?: Partial<PopoverContentProps>,
): SignalState<PopoverContentProps>;
```

Properties: [PopoverContentProps](README.md#popovercontentprops)

Data attributes: [PopoverContentDataAttributes](README.md#popovercontentdataattributes)

## PopoverRoot

### PopoverRootElement

A custom PopoverRoot element.

Properties: [PopoverRootProps](README.md#popoverrootprops)

```ts
new PopoverRootElement(props?: Partial<PopoverRootProps>): PopoverRootElement
```

### PopoverRootProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `defaultOpen` | `boolean` | Whether the popover is open by default.<br /><br />**Default**<br />`false` |
| `onOpenChange` | `null` \| (`open`: `boolean`) => `void` | Event handler called when the popover's open state changes.<br /><br />**Default**<br />`null` |
| `open` | `boolean` | Whether the popover is open.<br /><br />**Default**<br />`false` |

### usePopoverRoot()

```ts
function usePopoverRoot(
  element: ConnectableElement,
  props?: Partial<PopoverRootProps>,
): SignalState<PopoverRootProps>;
```

## PopoverTrigger

### PopoverTriggerElement

A custom PopoverTrigger element.

```ts
new PopoverTriggerElement(): PopoverTriggerElement
```

### usePopoverTrigger()

```ts
function usePopoverTrigger(element: ConnectableElement): void;
```

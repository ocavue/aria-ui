# @aria-ui/popover

## PopoverContentDataAttributes <a id="popover-content-data-attributes" href="#popover-content-data-attributes">#</a>

### Group

PopoverContent

<dl>

<dt>

`data-align: "center" | "start" | "end"`

</dt>

<dd>

</dd>

<dt>

`data-mounted: ""`

</dt>

<dd>

</dd>

<dt>

`data-side: "bottom" | "left" | "right" | "top"`

</dt>

<dd>

</dd>

<dt>

`data-state: "open" | "closed"`

</dt>

<dd>

</dd>

</dl>

## PopoverContentEvents <a id="popover-content-events" href="#popover-content-events">#</a>

### Group

PopoverContent

<dl>

<dt>

`escapeKeyDown: EscapeKeyDownEvent`

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

<dt>

`focusOutside: FocusOutsideEvent`

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

<dt>

`interactOutside: InteractOutsideEvent`

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the component.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

<dt>

`pointerDownOutside: PointerDownOutsideEvent`

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

</dl>

## PopoverContentProps <a id="popover-content-props" href="#popover-content-props">#</a>

### Group

PopoverContent

<dl>

<dt>

`altBoundary: boolean`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see https://floating-ui.com/docs/detectoverflow#altboundary for more information.

**Default**: `false`

</dd>

<dt>

`autoUpdate: boolean | AutoUpdateOptions`

</dt>

<dd>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary: Boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to. Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**: `'clippingAncestors'`

</dd>

<dt>

`elementContext: ElementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#elementcontext for more information.

**Default**: `'floating'`

</dd>

<dt>

`fitViewport: boolean`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed the viewport.

**Default**: `false`

</dd>

<dt>

`flip: boolean | Placement[]`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit.

**Default**: `true`

</dd>

<dt>

`hide: boolean`

</dt>

<dd>

Whether to hide the floating element when the reference element or the floating element is fully clipped.

**Default**: `false`

</dd>

<dt>

`hoist: boolean`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**: `true`

</dd>

<dt>

`inline: boolean`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over multiple lines.

**Default**: `false`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the reference and floating element.

**Default**: `6`

</dd>

<dt>

`overflowPadding: number`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**: `4`

</dd>

<dt>

`overlap: boolean`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it in view.

**Default**: `false`

</dd>

<dt>

`placement: Placement`

</dt>

<dd>

The initial placement of the floating element

**Default**: `"top"`

</dd>

<dt>

`rootBoundary: RootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to. Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight: boolean`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the reference element.

**Default**: `false`

</dd>

<dt>

`sameWidth: boolean`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the reference element.

**Default**: `false`

</dd>

<dt>

`shift: boolean`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Default**: `true`

</dd>

<dt>

`strategy: "fixed" | "absolute"`

</dt>

<dd>

The strategy to use for positioning

**Default**: `"absolute"`

</dd>

<dt>

`transform: boolean`

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of layout (`top` and `left` CSS properties). CSS transforms are more performant, but can cause conflicts with transform animations.

**Default**: `false`

</dd>

</dl>

## PopoverRootEvents <a id="popover-root-events" href="#popover-root-events">#</a>

### Group

PopoverRoot

<dl>

<dt>

`openChange: CustomEvent<boolean>`

</dt>

<dd>

</dd>

</dl>

## PopoverRootProps <a id="popover-root-props" href="#popover-root-props">#</a>

### Group

PopoverRoot

<dl>

<dt>

`defaultOpen: boolean`

</dt>

<dd>

Whether the popover is open by default.

**Default**: `false`

</dd>

<dt>

`open: boolean`

</dt>

<dd>

Whether the popover is open.

**Default**: `false`

</dd>

</dl>

## EscapeKeyDownEvent <a id="escape-key-down-event" href="#escape-key-down-event">#</a>

**Type**: `CustomEvent<{ originalEvent: KeyboardEvent }>`

## popoverRootEvents <a id="popover-root-events-1" href="#popover-root-events-1">#</a>

### Group

PopoverContent

**Type**: `EventDeclarations<PopoverRootEvents>`

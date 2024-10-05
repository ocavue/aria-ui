# @aria-ui/popover

## API

### PopoverContentDataAttributes <a id="popover-content-data-attributes" href="#popover-content-data-attributes">#</a>

<dl>

<dt>

`data-align`

</dt>

<dd>

**Type**: `"center" | "start" | "end"`

</dd>

<dt>

`data-mounted`

</dt>

<dd>

**Type**: `""`

</dd>

<dt>

`data-side`

</dt>

<dd>

**Type**: `"bottom" | "left" | "right" | "top"`

</dd>

<dt>

`data-state`

</dt>

<dd>

**Type**: `"open" | "closed"`

</dd>

</dl>

### PopoverContentEvents <a id="popover-content-events" href="#popover-content-events">#</a>

<dl>

<dt>

`escapeKeyDown`

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `EscapeKeyDownEvent`

</dd>

<dt>

`focusOutside`

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `FocusOutsideEvent`

</dd>

<dt>

`interactOutside`

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the component.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `InteractOutsideEvent`

</dd>

<dt>

`pointerDownOutside`

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `PointerDownOutsideEvent`

</dd>

</dl>

### PopoverContentProps <a id="popover-content-props" href="#popover-content-props">#</a>

<dl>

<dt>

`altBoundary`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see https://floating-ui.com/docs/detectoverflow#altboundary for more information.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`autoUpdate`

</dt>

<dd>

Options to activate auto-update listeners

**Type**: `boolean | AutoUpdateOptions`

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to. Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Type**: `Boundary`

**Default**: `'clippingAncestors'`

</dd>

<dt>

`elementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#elementcontext for more information.

**Type**: `ElementContext`

**Default**: `'floating'`

</dd>

<dt>

`fitViewport`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed the viewport.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`flip`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit.

**Type**: `boolean | Placement[]`

**Default**: `true`

</dd>

<dt>

`hide`

</dt>

<dd>

Whether to hide the floating element when the reference element or the floating element is fully clipped.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`hoist`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`inline`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over multiple lines.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`offset`

</dt>

<dd>

The distance between the reference and floating element.

**Type**: `undefined | OffsetOptions`

**Default**: `4`

</dd>

<dt>

`overflowPadding`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Type**: `number`

**Default**: `4`

</dd>

<dt>

`overlap`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it in view.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`placement`

</dt>

<dd>

The initial placement of the floating element

**Type**: `Placement`

**Default**: `"top"`

</dd>

<dt>

`rootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to. Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Type**: `RootBoundary`

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the reference element.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`sameWidth`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the reference element.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`shift`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`strategy`

</dt>

<dd>

The strategy to use for positioning

**Type**: `"fixed" | "absolute"`

**Default**: `"absolute"`

</dd>

<dt>

`transform`

</dt>

<dd>

Whether to use `transform: translate3d()` for positioning instead of `top` and `left` (layout) to place the floating element.

**Type**: `boolean`

**Default**: `false`

</dd>

</dl>

### PopoverRootEvents <a id="popover-root-events" href="#popover-root-events">#</a>

<dl>

<dt>

`openChange`

</dt>

<dd>

**Type**: `CustomEvent<boolean>`

</dd>

</dl>

### PopoverRootProps <a id="popover-root-props" href="#popover-root-props">#</a>

<dl>

<dt>

`defaultOpen`

</dt>

<dd>

Whether the popover is open by default.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`open`

</dt>

<dd>

Whether the popover is open.

**Type**: `boolean`

**Default**: `false`

</dd>

</dl>

### EscapeKeyDownEvent <a id="escape-key-down-event" href="#escape-key-down-event">#</a>

**Type**: `CustomEvent<Object>`

### popoverRootEvents <a id="popover-root-events-1" href="#popover-root-events-1">#</a>

**Type**: `EventDeclarations<PopoverRootEvents>`

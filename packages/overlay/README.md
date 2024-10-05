# @aria-ui/overlay

## API

### OverlayPositionerDataAttributes <a id="overlay-positioner-data-attributes" href="#overlay-positioner-data-attributes">#</a>

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

</dl>

### OverlayPositionerProps <a id="overlay-positioner-props" href="#overlay-positioner-props">#</a>

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

**Default**: `false`

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

**Default**: `false`

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

**Type**: `OffsetOptions`

**Default**: `undefined`

</dd>

<dt>

`overflowPadding`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Type**: `number`

**Default**: `0`

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

**Default**: `false`

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

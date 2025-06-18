# @aria-ui/menu

## MenuContentProps <a id="menu-content-props" href="#menu-content-props">#</a>

### Group

MenuContent

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

`eventTarget?: HTMLElement | TypedEventTarget<"keydown">`

<code>
eventTarget?: <a href="https://example.com">HTMLElement</a> | <a href="https://example.com">TypedEventTarget</a><"keydown">
</code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a different element to listen for keydown events.

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

## MenuItemEvents <a id="menu-item-events" href="#menu-item-events">#</a>

### Group

MenuItem

<dl>

<dt>

`select: CustomEvent<void>`

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

## MenuItemProps <a id="menu-item-props" href="#menu-item-props">#</a>

### Group

MenuItem

<dl>

<dt>

`filter: ItemFilter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

**Default**: `defaultItemFilter`

</dd>

<dt>

`query: string`

</dt>

<dd>

The query string to filter the listbox items.

**Default**: `""`

</dd>

<dt>

`value: string`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated.

**Default**: `""`

</dd>

</dl>

## MenuContentEvents <a id="menu-content-events" href="#menu-content-events">#</a>

### Group

MenuContent

**Type**: `PopoverContentEvents`

## MenuRootEvents <a id="menu-root-events" href="#menu-root-events">#</a>

### Group

MenuRoot

**Type**: `PopoverRootEvents`

## MenuRootProps <a id="menu-root-props" href="#menu-root-props">#</a>

### Group

MenuRoot

**Type**: `PopoverRootProps`

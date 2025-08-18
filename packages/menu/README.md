# @aria-ui/menu

## MenuContent

### MenuContentProps {#menucontentprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see https://floating-ui.com/docs/detectoverflow#altboundary for more information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| `AutoUpdateOptions`</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to. Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#elementcontext for more information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: `HTMLElement` \| [`TypedEventTarget`](core.md#typedeventtarget)\<`"keydown"`\></code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the preferred placement(s) will overflow the clipping boundary. You can also provide an array of placements to try sequentially if the preferred `placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="hide" href="#hide">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to place the floating element on top of other page content. When enabled, the floating element won't be clipped by an ancestor. This provides a similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow. Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to. Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="transform" href="#transform">transform</a>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of layout (`top` and `left` CSS properties). CSS transforms are more performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

---

### MenuContentEvents {#menucontentevents}

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="menucontentevents" href="#menucontentevents">MenuContentEvents</a> = [`PopoverContentEvents`](popover.md#popovercontentevents)</code>

</dt>

<dd>

</dd>

</dl>

## MenuItem

### MenuItemEvents {#menuitemevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="select" href="#select">select</a>: `CustomEvent`\<`void`\></code>

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

---

### MenuItemProps {#menuitemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="filter" href="#filter">filter</a>: [`ItemFilter`](collection.md#itemfilter)</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="query" href="#query">query</a>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated.

###### Default

`""`

</dd>

</dl>

## MenuRoot

### MenuRootEvents {#menurootevents}

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="menurootevents" href="#menurootevents">MenuRootEvents</a> = [`PopoverRootEvents`](popover.md#popoverrootevents)</code>

</dt>

<dd>

</dd>

</dl>

---

### MenuRootProps {#menurootprops}

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="menurootprops" href="#menurootprops">MenuRootProps</a> = [`PopoverRootProps`](popover.md#popoverrootprops)</code>

</dt>

<dd>

</dd>

</dl>

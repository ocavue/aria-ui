# @aria-ui/select

## Interfaces

<a id="selectcontentevents"></a>

### SelectContentEvents

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="escapekeydown" href="#escapekeydown">escapeKeyDown</a>: [`EscapeKeyDownEvent`](popover.md#escapekeydownevent)</code>

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="focusoutside" href="#focusoutside">focusOutside</a>: `FocusOutsideEvent`</code>

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="interactoutside" href="#interactoutside">interactOutside</a>: `InteractOutsideEvent`</code>

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the component.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pointerdownoutside" href="#pointerdownoutside">pointerDownOutside</a>: `PointerDownOutsideEvent`</code>

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

</dd>

</dl>

## Variables

<a id="selectcontentevents-1"></a>

### selectContentEvents

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selectcontentevents-1" href="#selectcontentevents-1">selectContentEvents</a>: [`EventDeclarations`](core.md#eventdeclarations)\<[`PopoverContentEvents`](popover.md#popovercontentevents)\> = `popoverContentEvents`</code>

</dt>

</dl>

## SelectItem

<a id="selectitemprops"></a>

### SelectItemProps

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

###### Default

`""`

</dd>

</dl>

## SelectList

<a id="selectlistevents"></a>

### SelectListEvents

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="valuechange" href="#valuechange">valueChange</a>: `CustomEvent`\<`string`\></code>

</dt>

</dl>

---

<a id="selectlistprops"></a>

### SelectListProps

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="autofocus" href="#autofocus">autoFocus</a>: `boolean`</code>

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: `HTMLElement` \| [`TypedEventTarget`](core.md#typedeventtarget)\<`"keydown"`\></code>

</dt>

<dd>

By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a>: [`ItemFilter`](collection.md#itemfilter) \| `null`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

###### Default

`defaultItemFilter`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="query" href="#query">query</a>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="selectionmode" href="#selectionmode">selectionMode</a>: `"multiple"` \| `"single"`</code>

</dt>

<dd>

Listbox selection mode

(Currently only single selection mode is implemented)

###### Default

`"single"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The selected value.

###### Default

`""`

</dd>

</dl>

## SelectRoot

<a id="selectrootevents"></a>

### SelectRootEvents

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange" href="#openchange">openChange</a>: `CustomEvent`\<`boolean`\></code>

</dt>

</dl>

---

<a id="selectrootprops"></a>

### SelectRootProps

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

###### Default

`false`

</dd>

</dl>

## SelectValue

<a id="selectvalueprops"></a>

### SelectValueProps

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placeholder" href="#placeholder">placeholder</a>: `string`</code>

</dt>

<dd>

The value to show when no item is selected

###### Default

`""`

</dd>

</dl>

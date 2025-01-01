# @aria-ui/select

## SelectContentEvents <a id="select-content-events" href="#select-content-events">#</a>

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

## SelectItemProps <a id="select-item-props" href="#select-item-props">#</a>

### Group

SelectItem

<dl>

<dt>

`value: string`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Default**: `""`

</dd>

</dl>

## SelectListEvents <a id="select-list-events" href="#select-list-events">#</a>

### Group

SelectList

<dl>

<dt>

`valueChange: CustomEvent<string>`

</dt>

<dd>

</dd>

</dl>

## SelectListProps <a id="select-list-props" href="#select-list-props">#</a>

### Group

SelectList

<dl>

<dt>

`autoFocus: boolean`

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

**Default**: `false`

</dd>

<dt>

`eventTarget?: HTMLElement | TypedEventTarget<"keydown">`

</dt>

<dd>

By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events.

</dd>

<dt>

`filter: null | ItemFilter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

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

`selectionMode: "multiple" | "single"`

</dt>

<dd>

Listbox selection mode

(Currently only single selection mode is implemented)

**Default**: `"single"`

</dd>

<dt>

`value: string`

</dt>

<dd>

The selected value.

**Default**: `""`

</dd>

</dl>

## SelectRootEvents <a id="select-root-events" href="#select-root-events">#</a>

### Group

SelectRoot

<dl>

<dt>

`openChange: CustomEvent<boolean>`

</dt>

<dd>

</dd>

</dl>

## SelectRootProps <a id="select-root-props" href="#select-root-props">#</a>

### Group

SelectRoot

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

## SelectValueProps <a id="select-value-props" href="#select-value-props">#</a>

### Group

SelectValue

<dl>

<dt>

`placeholder: string`

</dt>

<dd>

The value to show when no item is selected

**Default**: `""`

</dd>

</dl>

## selectContentEvents <a id="select-content-events-1" href="#select-content-events-1">#</a>

**Type**: `EventDeclarations<PopoverContentEvents>`

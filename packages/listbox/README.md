# @aria-ui/listbox

## ListboxEvents <a id="listbox-events" href="#listbox-events">#</a>

### Group

Listbox

<dl>

<dt>

`valueChange: CustomEvent<string>`

</dt>

<dd>

</dd>

</dl>

## ListboxItemProps <a id="listbox-item-props" href="#listbox-item-props">#</a>

### Group

ListboxItem

<dl>

<dt>

`value: string`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Default**: `""`

</dd>

</dl>

## ListboxProps <a id="listbox-props" href="#listbox-props">#</a>

### Group

Listbox

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

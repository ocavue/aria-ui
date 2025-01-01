# @aria-ui/combobox

## ComboboxItemProps <a id="combobox-item-props" href="#combobox-item-props">#</a>

### Group

ComboboxItem

<dl>

<dt>

`value: string`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Default**: `""`

</dd>

</dl>

## ComboboxListEvents <a id="combobox-list-events" href="#combobox-list-events">#</a>

### Group

ComboboxList

<dl>

<dt>

`valueChange: CustomEvent<string>`

</dt>

<dd>

</dd>

</dl>

## ComboboxListProps <a id="combobox-list-props" href="#combobox-list-props">#</a>

### Group

ComboboxList

<dl>

<dt>

`autoFocus: boolean`

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

**Default**: `false`

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

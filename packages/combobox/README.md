# @aria-ui/combobox

## API

### ComboboxItemProps <a id="combobox-item-props" href="#combobox-item-props">#</a>

<dl>

<dt>

`value`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Type**: `string`

**Default**: `""`

</dd>

</dl>

### ComboboxListEvents <a id="combobox-list-events" href="#combobox-list-events">#</a>

<dl>

<dt>

`valueChange`

</dt>

<dd>

**Type**: `CustomEvent<string>`

</dd>

</dl>

### ComboboxListProps <a id="combobox-list-props" href="#combobox-list-props">#</a>

<dl>

<dt>

`autoFocus`

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`filter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

**Type**: `null | ItemFilter`

**Default**: `defaultItemFilter`

</dd>

<dt>

`query`

</dt>

<dd>

The query string to filter the listbox items.

**Type**: `string`

**Default**: `""`

</dd>

<dt>

`selectionMode`

</dt>

<dd>

Listbox selection mode

(Currently only single selection mode is implemented)

**Type**: `"multiple" | "single"`

**Default**: `"single"`

</dd>

<dt>

`value`

</dt>

<dd>

The selected value.

**Type**: `string`

**Default**: `""`

</dd>

</dl>

# @aria-ui/combobox

## ComboboxItem

### ComboboxItemProps {#comboboxitemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

###### Default

`""`

</dd>

</dl>

## ComboboxList

### ComboboxListEvents {#comboboxlistevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="valuechange" href="#valuechange">valueChange</a>: `CustomEvent`\<`string`\></code>

</dt>

</dl>

---

### ComboboxListProps {#comboboxlistprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="autofocus" href="#autofocus">autoFocus</a>: `boolean`</code>

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="filter" href="#filter">filter</a>: `null` \| [`ItemFilter`](collection.md#itemfilter)</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

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

<code data-typedoc-code><i></i> <a id="selectionmode" href="#selectionmode">selectionMode</a>: `"multiple"` \| `"single"`</code>

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

<code data-typedoc-code><i></i> <a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The selected value.

###### Default

`""`

</dd>

</dl>

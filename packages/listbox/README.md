# @aria-ui/listbox

## API

### ListboxEvents <a id="listbox-events" href="#listbox-events">#</a>

<dl>

<dt>

`valueChange`

</dt>

<dd>

**Type**: `CustomEvent<string>`

</dd>

</dl>

### ListboxItemProps <a id="listbox-item-props" href="#listbox-item-props">#</a>

<dl>

<dt>

`value`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

</dl>

### ListboxProps <a id="listbox-props" href="#listbox-props">#</a>

<dl>

<dt>

`autoFocus`

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

**Type**: `boolean`

**Default**

```ts
false;
```

</dd>

<dt>

`eventTarget`

</dt>

<dd>

By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events.

**Type**: `HTMLElement | TypedEventTarget<"keydown">`

</dd>

<dt>

`filter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

**Type**: `null | ItemFilter`

**Default**

```ts
defaultItemFilter;
```

</dd>

<dt>

`query`

</dt>

<dd>

The query string to filter the listbox items.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

<dt>

`selectionMode`

</dt>

<dd>

Listbox selection mode

(Currently only single selection mode is implemented)

**Type**: `"multiple" | "single"`

**Default**

```ts
"single";
```

</dd>

<dt>

`value`

</dt>

<dd>

The selected value.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

</dl>

# @aria-ui/listbox

## Listbox

### ListboxEvents

#### Properties

| Property      | Type                      |
| ------------- | ------------------------- |
| `valueChange` | `CustomEvent`\<`string`\> |

### ListboxProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes. **Default** `false` |
| `eventTarget?` | `HTMLElement` \| [`TypedEventTarget`](../core/README.md#typedeventtargeteventtype)\<`"keydown"`\> | By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events. |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown. **Default** `defaultItemFilter` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode (Currently only single selection mode is implemented) **Default** `"single"` |
| `value` | `string` | The selected value. **Default** `""` |

## ListboxItem

### ListboxItemProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |

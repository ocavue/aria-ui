# @aria-ui/listbox

## Listbox

### ListboxElement

A custom Listbox element.

```ts
new ListboxElement(): ListboxElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item.<br /><br />**Default**<br />`false` |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox.<br />By default, a simple case-insensitive substring match is used. You can<br />provide a custom filter function to match against a more complex pattern.<br />You can also pass `null` to disable filtering and allow all items to be<br />shown.<br /><br />**Default**<br />`defaultItemFilter` |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | By default, the Listbox element will listen for keydown events. However,<br />you can pass `onKeydownHandlerAdd` to override the default behavior.<br />`onKeydownHandlerAdd` receives a keydown handler when the Listbox element<br />is mounted, and returns a function that will be called when the Listbox<br />element is unmounted.<br /><br />**Default**<br />`null` |
| `onValueChange` | `null` \| (`value`: `string`) => `void` | Event handler called when the value changes.<br /><br />**Default**<br />`null` |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode<br /><br />(Currently only single selection mode is implemented)<br /><br />**Default**<br />`"single"` |
| `value` | `string` | The selected value.<br /><br />**Default**<br />`""` |

## ListboxEmpty

### ListboxEmptyElement

A custom ListboxEmpty element.

```ts
new ListboxEmptyElement(): ListboxEmptyElement
```

## ListboxItem

### ListboxItemElement

A custom ListboxItem element.

```ts
new ListboxItemElement(): ListboxItemElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected.<br /><br />**Default**<br />`null` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

### ListboxItemProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected.<br /><br />**Default**<br />`null` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

# @aria-ui/listbox

## Listbox

### ListboxElement

A custom Listbox element.

#### Constructors

```ts
new ListboxElement(): ListboxElement
```

#### Properties

| Property | Type | Description | Inherited from |
| --- | --- | --- | --- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes. **Default** `false` |  |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown. **Default** `defaultItemFilter` |  |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | By default, the Listbox element will listen for keydown events. However, you can pass `onKeydownHandlerAdd` to override the default behavior. `onKeydownHandlerAdd` receives a keydown handler when the Listbox element is mounted, and returns a function that will be called when the Listbox element is unmounted. **Default** `null` |  |
| `onValueChange` | `null` \| (`value`: `string`) => `void` | Event handler called when the value changes. **Default** `null` |  |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |  |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode (Currently only single selection mode is implemented) **Default** `"single"` |  |
| `value` | `string` | The selected value. **Default** `""` |  |

## ListboxEmpty

### ListboxEmptyElement

A custom ListboxEmpty element.

#### Constructors

```ts
new ListboxEmptyElement(): ListboxEmptyElement
```

## ListboxItem

### ListboxItemElement

A custom ListboxItem element.

#### Constructors

```ts
new ListboxItemElement(): ListboxItemElement
```

#### Properties

| Property | Type | Description | Inherited from |
| --- | --- | --- | --- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected. **Default** `null` |  |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |  |

### ListboxItemProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected. **Default** `null` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |

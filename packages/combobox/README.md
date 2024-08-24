# @aria-ui/combobox

## ComboboxEmpty

### ComboboxEmptyElement

A custom ComboboxEmpty element.

#### Constructors

```ts
new ComboboxEmptyElement(): ComboboxEmptyElement
```

## ComboboxItem

### ComboboxItemElement

A custom ComboboxItem element.

#### Constructors

```ts
new ComboboxItemElement(): ComboboxItemElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected. **Default** `null` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |

## ComboboxList

### ComboboxListElement

A custom ComboboxList element.

#### Constructors

```ts
new ComboboxListElement(): ComboboxListElement
```

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes. **Default** `false` |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown. **Default** `defaultItemFilter` |
| `onValueChange` | `null` \| (`value`: `string`) => `void` | Event handler called when the value changes. **Default** `null` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode (Currently only single selection mode is implemented) **Default** `"single"` |
| `value` | `string` | The selected value. **Default** `""` |

## ComboboxRoot

### ComboboxRootElement

A custom ComboboxRoot element.

#### Constructors

```ts
new ComboboxRootElement(): ComboboxRootElement
```

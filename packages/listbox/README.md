# @aria-ui/listbox

## Listbox

### ListboxElement

A custom Listbox element.

Properties: [ListboxProps](README.md#listboxprops)

```ts
new ListboxElement(props?: Partial<ListboxProps>): ListboxElement
```

### ListboxProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | By default, the Listbox element will listen for keydown events. However,<br />you can pass `onKeydownHandlerAdd` to override the default behavior.<br />`onKeydownHandlerAdd` receives a keydown handler when the Listbox element<br />is mounted, and returns a function that will be called when the Listbox<br />element is unmounted.<br /><br />**Default**<br />`null` |
| `onValueChange` | `null` \| (`value`: `string`) => `void` | Event handler called when the value changes.<br /><br />**Default**<br />`null` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode<br /><br />**Default**<br />`"single"` |
| `value` | `string` | The selected value.<br /><br />**Default**<br />`""` |

### useListbox()

```ts
function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
): SignalState<Readonly<ListboxProps>>;
```

## ListboxItem

### ListboxItemElement

A custom ListboxItem element.

Properties: [ListboxItemProps](README.md#listboxitemprops)

```ts
new ListboxItemElement(props?: Partial<ListboxItemProps>): ListboxItemElement
```

### ListboxItemProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `filter` | [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox.<br /><br />**Default**<br />`defaultItemFilter` |
| `onSelect` | `null` \| `VoidFunction` | The function to call when the item is selected.<br /><br />**Default**<br />`null` |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

### useListboxItem()

```ts
function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
): SignalState<Readonly<ListboxItemProps>>;
```

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
| `root` | `null` \| `HTMLElement` | A element that listens to keydown events. |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode<br /><br />**Default**<br />`"single"` |

### useListbox()

```ts
function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
): SingalState<Readonly<ListboxProps>>;
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
| `filter` | [`ListboxItemFilter`](README.md#listboxitemfilter) | The filter function to determine if an item should be shown in the listbox.<br /><br />By default, a simple case-insensitive substring match is used. |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
| `value` | `null` \| `string` | The value of the item. Every item must have a unique value in the parent<br />list. |

### ListboxItemFilter()

```ts
type ListboxItemFilter: (options: Object) => boolean;
```

The filter function to determine if an item should be shown in the listbox.

### useListboxItem()

```ts
function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
): SingalState<Readonly<ListboxItemProps>>;
```

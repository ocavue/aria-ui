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
| `filter` | (`options`: `Object`) => `boolean` | The filter function to determine if an item should be shown in the listbox.<br /><br />By default, a simple case-insensitive substring match is used. |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
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

| Property | Type               |
| :------- | :----------------- |
| `value`  | `null` \| `string` |

### useListboxItem()

```ts
function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
): SingalState<Readonly<ListboxItemProps>>;
```

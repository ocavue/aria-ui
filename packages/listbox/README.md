# @aria-ui/listbox

## Type Aliases

### RefCallback()\<T\>

```ts
type RefCallback<T>: (ref: T | null) => void;
```

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
| `filter` | [`ListboxItemFilter`](README.md#listboxitemfilter) | The filter function to determine if an item should be shown in the listbox.<br /><br />**Default**<br />`{@link defaultListboxItemFilter}` |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

### ListboxItemFilter()

```ts
type ListboxItemFilter: (options: Object) => boolean;
```

The filter function to determine if an item should be shown in the listbox.

### defaultListboxItemFilter()

```ts
function defaultListboxItemFilter(options: Object): boolean;
```

A simple case-insensitive substring match filter.

### useListboxItem()

```ts
function useListboxItem(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
): SingalState<Readonly<ListboxItemProps>>;
```

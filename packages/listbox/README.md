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
| `keydownListenerRef` | `null` \| [`RefCallback`](README.md#refcallbackt)\<(`event`: `KeyboardEvent`) => `void`\> | A callback to register a keydown listener. This callback receives a keydown<br />event listener when the Listbox element is mounted, and null when it is<br />unmounted.<br /><br />**Default**<br />`null` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode<br /><br />**Default**<br />`"single"` |

### useListbox()

```ts
function useListbox(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
): SingalState<ListboxProps>;
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
| `onHighlight` | (`value`: `string`) => `void` | The function to call when the item is highlighted. |
| `onSelect` | (`value`: `string`) => `void` | The function to call when the item is selected. |
| `query` | `string` | The query string to filter the listbox items.<br /><br />**Default**<br />`""` |
| `selectedValue` | `null` \| `string` | The value of the selected item in the current list. |
| `value` | `null` \| `string` | The value of the item. Every item must have a unique value in the parent<br />list. |

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
): SingalState<ListboxItemProps>;
```

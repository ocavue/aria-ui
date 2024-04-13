# @aria-ui/combobox

## ComboboxItem

### ComboboxItemElement

A custom ComboboxItem element.

Properties: [ComboboxItemProps](README.md#comboboxitemprops)

```ts
new ComboboxItemElement(props?: Partial<ComboboxItemProps>): ComboboxItemElement
```

### ComboboxItemProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

### useComboboxItem()

```ts
function useComboboxItem(
  element: ConnectableElement,
  props?: Partial<ComboboxItemProps>,
): SignalState<ComboboxItemProps>;
```

## ComboboxList

### ComboboxListElement

A custom ComboboxList element.

```ts
new ComboboxListElement(): ComboboxListElement
```

### useComboboxList()

```ts
function useComboboxList(element: ConnectableElement): void;
```

## ComboboxRoot

### ComboboxRootElement

A custom ComboboxRoot element.

```ts
new ComboboxRootElement(): ComboboxRootElement
```

### useComboboxRoot()

```ts
function useComboboxRoot(element: ConnectableElement): void;
```

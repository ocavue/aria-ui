# @aria-ui/menu

## Interfaces

### MenuItemEvents

#### Properties

| Property | Type                    | Description                        |
| -------- | ----------------------- | ---------------------------------- |
| `select` | `CustomEvent`\<`void`\> | Emitted when the item is selected. |

### MenuItemProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `filter` | [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. **Default** `defaultItemFilter` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. By default, a random value is generated. **Default** `""` |

### MenuTriggerEvents

## Type Aliases

### MenuContentEvents

```ts
type MenuContentEvents: PopoverContentEvents;
```

### MenuRootEvents

```ts
type MenuRootEvents: PopoverRootEvents;
```

## Variables

### menuContentEvents

```ts
const menuContentEvents: EventDeclarations<MenuContentEvents> =
  popoverContentEvents;
```

### menuItemEvents

```ts
const menuItemEvents: EventDeclarations<MenuItemEvents>;
```

### menuItemProps

```ts
const menuItemProps: PropDeclarations<MenuItemProps>;
```

### menuRootEvents

```ts
const menuRootEvents: EventDeclarations<MenuRootEvents> = popoverRootEvents;
```

### menuTriggerEvents

```ts
const menuTriggerEvents: EventDeclarations<MenuTriggerEvents> =
  popoverTriggerEvents;
```

## MenuRoot

### MenuRootProps

```ts
type MenuRootProps: PopoverRootProps;
```

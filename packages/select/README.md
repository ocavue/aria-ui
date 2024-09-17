# @aria-ui/select

## Interfaces

### SelectContentEvents

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `escapeKeyDown` | [`EscapeKeyDownEvent`](../popover/README.md#escapekeydownevent) | An event fired when the escape key is pressed. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `focusOutside` | `FocusOutsideEvent` | An event fired when the focus is moved outside the element. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `interactOutside` | `InteractOutsideEvent` | An event fired when an interaction (pointer or focus) happens outside the component. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |
| `pointerDownOutside` | `PointerDownOutsideEvent` | An event fired when the pointer is pressed down outside the element. By default, the popover will be closed. It can be prevented by calling `preventDefault()`. |

## Variables

### selectContentEvents

```ts
const selectContentEvents: EventDeclarations<PopoverContentEvents> =
  popoverContentEvents;
```

## SelectItem

### SelectItemProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent list. **Default** `""` |

## SelectList

### SelectListEvents

#### Properties

| Property       | Type                      |
| -------------- | ------------------------- |
| `update:value` | `CustomEvent`\<`string`\> |

### SelectListProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `autoFocus` | `boolean` | Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes. **Default** `false` |
| `eventTarget` | `null` \| `HTMLElement` \| [`TypedEventTarget`](../core/README.md#typedeventtargeteventtype)\<`"keydown"`\> | By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events. **Default** `null` |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown. **Default** `defaultItemFilter` |
| `query` | `string` | The query string to filter the listbox items. **Default** `""` |
| `selectionMode` | `"multiple"` \| `"single"` | Listbox selection mode (Currently only single selection mode is implemented) **Default** `"single"` |
| `value` | `string` | The selected value. **Default** `""` |

## SelectRoot

### SelectRootEvents

#### Properties

| Property      | Type                       |
| ------------- | -------------------------- |
| `update:open` | `CustomEvent`\<`boolean`\> |

### SelectRootProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `defaultOpen` | `boolean` | Whether the popover is open by default. **Default** `false` |
| `open` | `boolean` | Whether the popover is open. **Default** `false` |

## SelectValue

### SelectValueProps

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `placeholder` | `string` | The value to show when no item is selected **Default** `""` |

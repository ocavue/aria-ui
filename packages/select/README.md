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

### SelectItemEvents

### SelectListEvents

#### Properties

| Property       | Type                      |
| -------------- | ------------------------- |
| `update:value` | `CustomEvent`\<`string`\> |

## Variables

### selectContentEvents

```ts
const selectContentEvents: EventDeclarations<PopoverContentEvents> =
  popoverContentEvents;
```

### selectItemEvents

```ts
const selectItemEvents: EventDeclarations<SelectItemEvents> = listboxItemEvents;
```

### selectListEvents

```ts
const selectListEvents: EventDeclarations<SelectListEvents> = listboxEvents;
```

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

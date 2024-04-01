# @aria-ui/select

## SelectItem

### SelectItemElement

A custom SelectItem element.

Properties: [SelectItemProps](README.md#selectitemprops)

```ts
new SelectItemElement(props?: Partial<SelectItemProps>): SelectItemElement
```

### SelectItemProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `value` | `string` | The value of the item. Every item must have a unique value in the parent<br />list.<br /><br />**Default**<br />`""` |

### useSelectItem()

```ts
function useSelectItem(
  element: ConnectableElement,
  props?: Partial<SelectItemProps>,
): SingalState<SelectItemProps>;
```

## SelectList

### SelectListElement

A custom SelectList element.

```ts
new SelectListElement(): SelectListElement
```

### useSelectList()

```ts
function useSelectList(element: ConnectableElement): void;
```

## SelectPositioner

### SelectPositionerElement

A custom SelectPositioner element.

Properties: [SelectPositionerProps](README.md#selectpositionerprops)

```ts
new SelectPositionerElement(props?: Partial<SelectPositionerProps>): SelectPositionerElement
```

### SelectPositionerProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `altBoundary` | `boolean` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`true` |
| `autoUpdate` | `boolean` \| `Partial`\<`Object`\> | Options to activate auto-update listeners<br /><br />**See**<br />https://floating-ui.com/docs/autoUpdate<br /><br />**Default**<br />`true` |
| `boundary` | `Boundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'clippingAncestors'` |
| `elementContext` | `ElementContext` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'floating'` |
| `fitViewport` | `boolean` | Whether to constrain the floating element's width and height to not exceed<br />the viewport.<br /><br />**Default**<br />`false` |
| `flip` | `boolean` \| `Placement`[] | Whether to flip the `placement` in order to keep it in view when the<br />preferred placement(s) will overflow the clipping boundary. You can also<br />provide an array of placements to try sequentially if the preferred<br />`placement` does not fit.<br /><br />**Default**<br />`true` |
| `hide` | `boolean` | Whether to hide the floating element when the reference element or the<br />floating element is fully clipped.<br /><br />**Default**<br />`false` |
| `hoist` | `boolean` | Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)<br />to place the floating element on top of other page content. When enabled,<br />the floating element won't be clipped by an ancestor. This provides a<br />similar result to React's `<Portals>` or Vue's `<Teleport>`.<br /><br />**Default**<br />`true` |
| `inline` | `boolean` | Whether to improve positioning for inline reference elements that span over<br />multiple lines.<br /><br />**Default**<br />`false` |
| `offset` | `null` \| `OffsetOptions` | The distance between the reference and floating element.<br /><br />**Default**<br />`4` |
| `onEscapeKeyDown` | `null` \| (`event`: `KeyboardEvent`) => `void` | Event handler called when the escape key is pressed.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onFocusOutside` | `null` \| (`event`: `FocusOutsideEvent`) => `void` | Event handler called when the focus is moved outside the element.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onInteractOutside` | `null` \| (`event`: `InteractOutsideEvent`) => `void` | Function called when an interaction (pointer or focus) happens outside the<br />component.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `onPointerDownOutside` | `null` \| (`event`: `PointerDownOutsideEvent`) => `void` | Event handler called when the pointer is pressed down outside the element.<br /><br />By default, the popover will be closed. It can be prevented by calling<br />`event.preventDefault`. |
| `overflowPadding` | `number` | **Default**<br />`4` |
| `overlap` | `boolean` | Whether the floating element can overlap the reference element to keep it<br />in view.<br /><br />**Default**<br />`false` |
| `placement` | `Placement` | The initial placement of the floating element<br /><br />**Default**<br />`"bottom"` |
| `rootBoundary` | `RootBoundary` | **See**<br />https://floating-ui.com/docs/detectoverflow<br /><br />**Default**<br />`'viewport'` |
| `sameHeight` | `boolean` | Whether to constrain the floating element's height so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `sameWidth` | `boolean` | Whether to constrain the floating element's width so that it matches the<br />reference element.<br /><br />**Default**<br />`false` |
| `shift` | `boolean` | Whether the floating element should shift to keep it in view.<br /><br />**Default**<br />`true` |
| `strategy` | `"absolute"` \| `"fixed"` | The strategy to use for positioning<br /><br />**Default**<br />`"absolute"` |

### useSelectPositioner()

```ts
function useSelectPositioner(
  element: ConnectableElement,
  props?: Partial<SelectPositionerProps>,
): SingalState<SelectPositionerProps>;
```

## SelectRoot

### SelectRootElement

A custom SelectRoot element.

```ts
new SelectRootElement(): SelectRootElement
```

### useSelectRoot()

```ts
function useSelectRoot(element: ConnectableElement): void;
```

## SelectTrigger

### SelectTriggerElement

A custom SelectTrigger element.

```ts
new SelectTriggerElement(): SelectTriggerElement
```

### useSelectTrigger()

```ts
function useSelectTrigger(element: ConnectableElement): void;
```

## SelectValue

### SelectValueElement

A custom SelectValue element.

Properties: [SelectValueProps](README.md#selectvalueprops)

```ts
new SelectValueElement(props?: Partial<SelectValueProps>): SelectValueElement
```

### SelectValueProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `placeholder` | `string` | The value to show when no item is selected<br /><br />**Default**<br />`""` |

### useSelectValue()

```ts
function useSelectValue(
  element: ConnectableElement,
  props?: Partial<SelectValueProps>,
): SingalState<Readonly<SelectValueProps>>;
```
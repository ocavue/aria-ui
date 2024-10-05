# @aria-ui/select

## API

### SelectContentEvents <a id="select-content-events" href="#select-content-events">#</a>

<dl>

<dt>

`escapeKeyDown`

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `EscapeKeyDownEvent`

</dd>

<dt>

`focusOutside`

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `FocusOutsideEvent`

</dd>

<dt>

`interactOutside`

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the component.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `InteractOutsideEvent`

</dd>

<dt>

`pointerDownOutside`

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling `preventDefault()`.

**Type**: `PointerDownOutsideEvent`

</dd>

</dl>

### SelectItemProps <a id="select-item-props" href="#select-item-props">#</a>

<dl>

<dt>

`value`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent list.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

</dl>

### SelectListEvents <a id="select-list-events" href="#select-list-events">#</a>

<dl>

<dt>

`valueChange`

</dt>

<dd>

**Type**: `CustomEvent<string>`

</dd>

</dl>

### SelectListProps <a id="select-list-props" href="#select-list-props">#</a>

<dl>

<dt>

`autoFocus`

</dt>

<dd>

Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.

**Type**: `boolean`

**Default**

```ts
false;
```

</dd>

<dt>

`eventTarget`

</dt>

<dd>

By default, the Listbox element will listen for keydown events. You can pass a different element to listen for keydown events.

**Type**: `HTMLElement | TypedEventTarget<"keydown">`

</dd>

<dt>

`filter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.

**Type**: `null | ItemFilter`

**Default**

```ts
defaultItemFilter;
```

</dd>

<dt>

`query`

</dt>

<dd>

The query string to filter the listbox items.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

<dt>

`selectionMode`

</dt>

<dd>

Listbox selection mode

(Currently only single selection mode is implemented)

**Type**: `"multiple" | "single"`

**Default**

```ts
"single";
```

</dd>

<dt>

`value`

</dt>

<dd>

The selected value.

**Type**: `string`

**Default**

```ts
("");
```

</dd>

</dl>

### SelectRootEvents <a id="select-root-events" href="#select-root-events">#</a>

<dl>

<dt>

`openChange`

</dt>

<dd>

**Type**: `CustomEvent<boolean>`

</dd>

</dl>

### SelectRootProps <a id="select-root-props" href="#select-root-props">#</a>

<dl>

<dt>

`defaultOpen`

</dt>

<dd>

Whether the popover is open by default.

**Type**: `boolean`

**Default**

```ts
false;
```

</dd>

<dt>

`open`

</dt>

<dd>

Whether the popover is open.

**Type**: `boolean`

**Default**

```ts
false;
```

</dd>

</dl>

### SelectValueProps <a id="select-value-props" href="#select-value-props">#</a>

<dl>

<dt>

`placeholder`

</dt>

<dd>

The value to show when no item is selected

**Type**: `string`

**Default**

```ts
("");
```

</dd>

</dl>

### selectContentEvents <a id="select-content-events-1" href="#select-content-events-1">#</a>

**Type**: `EventDeclarations<PopoverContentEvents>`

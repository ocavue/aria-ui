# @aria-ui/listbox

## Type Aliases

### ExtractDefaultValue\<T\>

```ts
type ExtractDefaultValue<T>: T extends WithDefaultValue<infer P> ? P : never;
```

### ListboxStateType

```ts
type ListboxStateType: ExtractDefaultValue<typeof ListboxState>;
```

COMMENT ListboxStateType

### WithDefaultValue\<T\>

```ts
type WithDefaultValue<T>: { [K in keyof T]: Object };
```

## Variables

### ListboxState

```ts
const ListboxState: object;
```

COMMENT ListboxState

#### Type declaration

##### a

```ts
a: object;
```

COMMENT A

##### a.defaultValue

```ts
defaultValue: string = "string";
```

##### b

```ts
b: object;
```

COMMENT B

##### b.defaultValue

```ts
defaultValue: string = "123";
```

## Listbox

### ListboxElement

A custom Listbox element.

```ts
new ListboxElement(): ListboxElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `autoFocus` | `boolean` | <p>Whether the listbox should automatically set the focus to the first item when the listbox is mounted or when the query changes.</p><p>**Default**</p><code>false</code> |
| `filter` | `null` \| [`ItemFilter`](../collection/README.md#itemfilter) | <p>The filter function to determine if an item should be shown in the listbox. By default, a simple case-insensitive substring match is used. You can provide a custom filter function to match against a more complex pattern. You can also pass `null` to disable filtering and allow all items to be shown.</p><p>**Default**</p><code>defaultItemFilter</code> |
| `onKeydownHandlerAdd` | `null` \| (`handler`: (`event`: `KeyboardEvent`) => `void`) => `VoidFunction` | <p>By default, the Listbox element will listen for keydown events. However, you can pass `onKeydownHandlerAdd` to override the default behavior. `onKeydownHandlerAdd` receives a keydown handler when the Listbox element is mounted, and returns a function that will be called when the Listbox element is unmounted.</p><p>**Default**</p><code>null</code> |
| `onValueChange` | `null` \| (`value`: `string`) => `void` | <p>Event handler called when the value changes.</p><p>**Default**</p><code>null</code> |
| `query` | `string` | <p>The query string to filter the listbox items.</p><p>**Default**</p><code>""</code> |
| `selectionMode` | `"multiple"` \| `"single"` | <p>Listbox selection mode</p><p>(Currently only single selection mode is implemented)</p><p>**Default**</p><code>"single"</code> |
| `value` | `string` | <p>The selected value.</p><p>**Default**</p><code>""</code> |

## ListboxEmpty

### ListboxEmptyElement

A custom ListboxEmpty element.

```ts
new ListboxEmptyElement(): ListboxEmptyElement
```

## ListboxItem

### ListboxItemElement

A custom ListboxItem element.

```ts
new ListboxItemElement(): ListboxItemElement
```

| Property | Type | Description |
| :-- | :-- | :-- |
| `onSelect` | `null` \| `VoidFunction` | <p>The function to call when the item is selected.</p><p>**Default**</p><code>null</code> |
| `value` | `string` | <p>The value of the item. Every item must have a unique value in the parent list.</p><p>**Default**</p><code>""</code> |

### ListboxItemProps

| Property | Type | Description |
| :-- | :-- | :-- |
| `onSelect` | `null` \| `VoidFunction` | <p>The function to call when the item is selected.</p><p>**Default**</p><code>null</code> |
| `value` | `string` | <p>The value of the item. Every item must have a unique value in the parent list.</p><p>**Default**</p><code>""</code> |

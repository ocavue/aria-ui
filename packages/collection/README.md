# @aria-ui/collection

## Collection <a id="collection" href="#collection">#</a>

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Collection(items: Iterable<HTMLElement>, loop?: boolean): Collection
```

</dd>

<dt>

`loop: boolean`

</dt>

<dd>

</dd>

<dt>

`first`

</dt>

<dd>

Returns the first enabled value.

```ts
const first: () => null | string
```

</dd>

<dt>

`getElement`

</dt>

<dd>

Finds an element from its value.

```ts
const getElement: (value: string) => null | HTMLElement
```

</dd>

<dt>

`getValues`

</dt>

<dd>

Returns all values.

```ts
const getValues: () => string[]
```

</dd>

<dt>

`last`

</dt>

<dd>

Returns the last enabled value.

```ts
const last: () => null | string
```

</dd>

<dt>

`next`

</dt>

<dd>

Returns the next enabled value.

```ts
const next: (value: null | string) => null | string
```

</dd>

<dt>

`prev`

</dt>

<dd>

Returns the previous enabled value.

```ts
const prev: (value: null | string) => null | string
```

</dd>

<dt>

`size`

</dt>

<dd>

```ts
const size: () => number
```

</dd>

</dl>

## ItemFilter <a id="item-filter" href="#item-filter">#</a>

The filter function to determine if an item should be shown in the collection.

**Type**: `(options: { query: string; value: string }) => boolean`

## defaultItemFilter <a id="default-item-filter" href="#default-item-filter">#</a>

A simple case-insensitive substring match filter.

```ts
function defaultItemFilter(options: { query: string; value: string }): boolean
```

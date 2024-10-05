# @aria-ui/collection

## API

### Collection <a id="collection" href="#collection">#</a>

<dl>

<dt>

`constructor`

</dt>

<dd>

```ts
new Collection(items: Iterable<HTMLElement>, loop: boolean)
```

</dd>

<dt>

`loop`

</dt>

<dd>

**Type**: `boolean`

</dd>

<dt>

`first`

</dt>

<dd>

```ts
const first: () => null | string;
```

</dd>

<dt>

`getElement`

</dt>

<dd>

```ts
const getElement: (value: string) => null | HTMLElement;
```

</dd>

<dt>

`getValues`

</dt>

<dd>

```ts
const getValues: () => string[];
```

</dd>

<dt>

`last`

</dt>

<dd>

```ts
const last: () => null | string;
```

</dd>

<dt>

`next`

</dt>

<dd>

```ts
const next: (value: null | string) => null | string;
```

</dd>

<dt>

`prev`

</dt>

<dd>

```ts
const prev: (value: null | string) => null | string;
```

</dd>

<dt>

`size`

</dt>

<dd>

```ts
const size: () => number;
```

</dd>

</dl>

### ItemFilter <a id="item-filter" href="#item-filter">#</a>

The filter function to determine if an item should be shown in the collection.

**Type**: `(options: Object) => boolean`

### defaultItemFilter <a id="default-item-filter" href="#default-item-filter">#</a>

A simple case-insensitive substring match filter.

```ts
function defaultItemFilter(options: Object): boolean;
```

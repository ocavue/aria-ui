# @aria-ui/collection

## Classes

### Collection

```ts
new Collection(items: Iterable<HTMLElement>, loop: boolean): Collection
```

| Property | Modifier   | Type      |
| :------- | :--------- | :-------- |
| `loop`   | `readonly` | `boolean` |

#### Methods

##### first()

```ts
first(): null | string
```

##### getElement()

```ts
getElement(value: string): null | HTMLElement
```

##### last()

```ts
last(): null | string
```

##### next()

```ts
next(value: null | string): null | string
```

##### prev()

```ts
prev(value: null | string): null | string
```

##### size()

```ts
size(): number
```

## Type Aliases

### ItemFilter()

```ts
type ItemFilter: (options: Object) => boolean;
```

The filter function to determine if an item should be shown in the collection.

## Functions

### defaultItemFilter()

```ts
function defaultItemFilter(options: Object): boolean;
```

A simple case-insensitive substring match filter.

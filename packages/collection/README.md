# @aria-ui/collection

## Classes

### Collection

```ts
new Collection(items: Iterable<HTMLElement>, loop: boolean): Collection
```

| Property | Modifier   | Type      | Default value |
| :------- | :--------- | :-------- | :------------ |
| `loop`   | `readonly` | `boolean` | `true`        |

#### Methods

##### first()

```ts
first(): null | string
```

Returns the first enabled value.

##### getElement()

```ts
getElement(value: string): null | HTMLElement
```

Finds an element from its value.

##### getValues()

```ts
getValues(): string[]
```

Returns all values.

##### last()

```ts
last(): null | string
```

Returns the last enabled value.

##### next()

```ts
next(value: null | string): null | string
```

Returns the next enabled value.

##### prev()

```ts
prev(value: null | string): null | string
```

Returns the previous enabled value.

##### size()

```ts
size(): number
```

## Type Aliases

### ItemFilter()

```ts
type ItemFilter: (options: object) => boolean;
```

The filter function to determine if an item should be shown in the collection.

## Functions

### defaultItemFilter()

```ts
function defaultItemFilter(options: object): boolean;
```

A simple case-insensitive substring match filter.

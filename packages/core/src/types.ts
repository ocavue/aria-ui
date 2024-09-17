/**
 * @internal
 *
 * @example
 *
 * ```
 * type MyObject = { a: 1; b: 'B' }
 * type MyEntries = ObjectEntries<MyObject>
 * //   ^ ["a", 1] | ["b", "B"]
 *
 */
export type ObjectEntries<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

/**
 * @internal
 */
export const getObjectEntries = Object.entries as <T extends object>(
  obj: T,
) => ObjectEntries<T>[]

/**
 * @internal
 */
export const getObjectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>

/**
 * @internal
 */
export const getObjectValues = Object.values as <T extends object>(
  obj: T,
) => Array<T[keyof T]>

declare const emptyObjectSymbol: unique symbol

/**
 * Represents a strictly empty plain object, the `{}` value.
 *
 * When you annotate something as the type `{}`, it can be anything except
 * `null` and `undefined`. This means that you cannot use `{}` to represent an
 * empty plain object ([read more](https://stackoverflow.com/questions/47339869/typescript-empty-object-and-any-difference/52193484#52193484)).
 *
 * @public
 */
export interface EmptyObject {
  /** @internal */
  [emptyObjectSymbol]?: never
}

/**
 * An interface thats can be used to register event listeners.
 */
export interface TypedEventTarget<EventType extends keyof DocumentEventMap> {
  addEventListener: (
    type: EventType,
    listener: (event: DocumentEventMap[EventType]) => void,
  ) => void
  removeEventListener: (
    type: EventType,
    listener: (event: DocumentEventMap[EventType]) => void,
  ) => void
}

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

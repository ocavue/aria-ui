import { getObjectKeys } from "./types"

/**
 * Merges two objects, with the second object taking precedence. Only keys
 * present in the first object will be included in the result.
 *
 * @group Props and States
 */
export function assignProps<T extends object>(
  defaultProps: Readonly<T>,
  props?: Partial<T>,
): Readonly<T> {
  if (!props) {
    return defaultProps
  }

  const merged: T = { ...defaultProps }
  for (const key of getObjectKeys(defaultProps)) {
    const prop = props[key] as T[keyof T] | undefined
    if (prop !== undefined) {
      merged[key] = prop
    }
  }
  return merged
}

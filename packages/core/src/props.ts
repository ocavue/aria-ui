import { getObjectKeys } from "./types"

/**
 * Merge two objects, with the second object taking precedence. Only keys
 * present in the first object will be included in the result.
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
    const prop = props[key]
    if (prop !== undefined) {
      merged[key] = prop
    }
  }
  return merged
}

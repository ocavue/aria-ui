import type { Collection } from './collection.ts'

/**
 * @internal
 */
export function handleCollectionNavigation(
  event: KeyboardEvent,
  collection: Collection,
  highlightedValue: string | null,
  setHighlightedValue: (value: string | null) => void,
  orientation: 'vertical' | 'horizontal' = 'vertical',
  stopPropagation = false,
): boolean {
  if (collection.size() === 0) return false

  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'

  let nextValue: string | null = null

  switch (event.key) {
    case nextKey:
      nextValue = collection.next(highlightedValue)
      break
    case prevKey:
      nextValue = collection.prev(highlightedValue)
      break
    case 'Home':
      nextValue = collection.first()
      break
    case 'End':
      nextValue = collection.last()
      break
    default:
      return false
  }

  event.preventDefault()
  if (stopPropagation) event.stopPropagation()
  if (nextValue != null) setHighlightedValue(nextValue)
  return true
}

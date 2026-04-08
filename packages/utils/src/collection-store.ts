import { createSignal } from '@aria-ui/core'

import { Collection } from './collection.ts'

/**
 * @internal
 */
export interface CollectionStore {
  getHighlightedValue: () => string | null
  setHighlightedValue: (value: string | null) => void
  getCollection: () => Collection
  setCollection: (value: Collection) => void
}

/**
 * @internal
 */
export function createCollectionStore(): CollectionStore {
  const highlightedValue = createSignal<string | null>(null)
  const collection = createSignal<Collection>(new Collection([]))

  const getHighlightedValue = highlightedValue.get
  const setHighlightedValue = highlightedValue.set
  const getCollection = collection.get
  const setCollection = collection.set

  return {
    getHighlightedValue,
    setHighlightedValue,
    getCollection,
    setCollection,
  }
}

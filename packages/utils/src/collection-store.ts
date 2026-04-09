import { createSignal } from '@aria-ui/core'
import { getId } from '@ocavue/utils'

import { Collection } from './collection.ts'
import { sortElements } from './sort-elements.ts'

/**
 * @internal
 */
export interface CollectionStore {
  getHighlightedValue: () => string | undefined
  setHighlightedValue: (value: string | undefined) => void
  getCollection: () => Collection
  registerItem: (element: HTMLElement) => void
  unregisterItem: (element: HTMLElement) => void
  markDirty: () => void
}

/**
 * @internal
 */
export function createCollectionStore(): CollectionStore {
  const highlightedValue = createSignal<string | undefined>(undefined)
  const version = createSignal(getId())
  const items = new Set<HTMLElement>()
  let dirty = true
  let cached = new Collection([])
  let pendingNotify = false

  const notify = () => {
    dirty = true
    if (!pendingNotify) {
      pendingNotify = true
      queueMicrotask(() => {
        pendingNotify = false
        version.set(getId())
      })
    }
  }

  const getCollection = (): Collection => {
    version.get() // track reactive dependency
    if (dirty) {
      dirty = false
      const sorted = sortElements(items)
      cached = new Collection(sorted)
    }
    return cached
  }

  return {
    getHighlightedValue: highlightedValue.get,
    setHighlightedValue: highlightedValue.set,
    getCollection,
    registerItem: (element) => {
      if (items.has(element)) return
      items.add(element)
      notify()
    },
    unregisterItem: (element) => {
      if (!items.has(element)) return
      items.delete(element)
      notify()
    },
    markDirty: notify,
  }
}

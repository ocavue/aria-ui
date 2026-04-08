import type { HostElement, Store } from '@aria-ui/core'
import { computed, onMount, useEffect, useEventListener } from '@aria-ui/core'

import { useAriaDisabled } from './aria.ts'
import { Collection, getCollectionItemValue } from './collection.ts'
import { useAttribute } from './use-attribute.ts'

/**
 * The minimal store interface required by {@link setupCollectionItem}.
 *
 * @internal
 */
export interface CollectionItemStore {
  getHighlightedValue(): string | null
  setHighlightedValue(value: string | null): void
  setCollection(collection: Collection): void
}

/**
 * @internal
 */
export interface CollectionItemConfig {
  getStore(): CollectionItemStore | undefined
  containerSelector: string
  itemSelector: string
  filterToLevel: boolean
}

/**
 * Shared setup logic for collection items (listbox options, menu items, etc.).
 *
 * Handles: role, value derivation, aria-disabled, data-highlighted,
 * collection rebuild on mount/unmount/prop changes, and mouseenter highlighting.
 *
 * @internal
 */
export function setupCollectionItem(
  host: HostElement,
  props: Store<{ value: string; disabled: boolean }>,
  config: CollectionItemConfig,
): { rebuildCollection: () => void } {
  useEffect(host, () => {
    if (props.value.get()) return
    const itemValue = getCollectionItemValue(host)
    if (itemValue) props.value.set(itemValue)
  })

  useAriaDisabled(host, () => props.disabled.get())

  const getIsHighlighted = computed((): boolean => {
    const store = config.getStore()
    if (!store) return false
    return store.getHighlightedValue() === props.value.get()
  })
  useAttribute(host, 'data-highlighted', () => (getIsHighlighted() ? '' : undefined))

  const rebuildCollection = () => {
    const store = config.getStore()
    if (!store) return
    const container = host.closest(config.containerSelector)
    if (!container) return
    const allItems = container.querySelectorAll<HTMLElement>(config.itemSelector)
    const items = config.filterToLevel
      ? [...allItems].filter((el) => el.closest(config.containerSelector) === container)
      : allItems
    store.setCollection(new Collection(items))
  }

  // TODO: improve efficiency
  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    rebuildCollection()
  })

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    const store = config.getStore()
    if (!store) return
    store.setHighlightedValue(props.value.get())
  })

  return { rebuildCollection }
}

import type { HostElement, Store } from '@aria-ui/core'
import { computed, onMount, useEffect, useEventListener } from '@aria-ui/core'

import { useAriaDisabled } from './aria.ts'
import type { CollectionStore } from './collection-store.ts'
import { Collection, getCollectionItemValue } from './collection.ts'
import { useAttribute } from './use-attribute.ts'

interface CollectionItemConfig {
  getStore(): CollectionStore | undefined
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
  const {
    value: { get: getValue, set: setValue },
    disabled: { get: getDisabled },
  } = props

  useEffect(host, () => {
    if (getValue()) return
    const itemValue = getCollectionItemValue(host)
    if (itemValue) setValue(itemValue)
  })

  useAriaDisabled(host, getDisabled)

  const getIsHighlighted = computed((): boolean => {
    const store = config.getStore()
    if (!store) return false
    return store.getHighlightedValue() === getValue()
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
    getValue()
    getDisabled()
    rebuildCollection()
  })

  useEventListener(host, 'mouseenter', () => {
    if (getDisabled()) return
    const store = config.getStore()
    if (!store) return
    store.setHighlightedValue(getValue())
  })

  return { rebuildCollection }
}

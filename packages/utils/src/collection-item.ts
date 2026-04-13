import type { HostElement, State } from '@aria-ui/core'
import { computed, useEffect } from '@aria-ui/core'

import { useAriaDisabled } from './aria.ts'
import type { CollectionStore } from './collection-store.ts'
import { getCollectionItemValue } from './collection.ts'
import { useAttribute } from './use-attribute.ts'
import { useEventListener } from './use-event-listener.ts'
import { useIsMouseActive } from './use-is-mouse-active.ts'

/**
 * Shared setup logic for collection items (listbox options, menu items, etc.).
 *
 * Handles: value derivation, aria-disabled, data-highlighted,
 * item registration on mount/unmount, and mouseenter highlighting.
 *
 * @internal
 */
export function setupCollectionItem(
  host: HostElement,
  props: State<{ value: string; disabled: boolean }>,
  getStore: () => CollectionStore | undefined,
  shouldRegisterItem?: (element: HTMLElement) => boolean,
): void {
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
    const store = getStore()
    if (!store) return false
    return store.getHighlightedValue() === getValue()
  })
  useAttribute(host, 'data-highlighted', () => (getIsHighlighted() ? '' : undefined))

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    if (shouldRegisterItem && shouldRegisterItem(host) === false) return
    store.registerItem(host)
    return () => store.unregisterItem(host)
  })

  useEffect(host, () => {
    getValue() // track value changes — collection indexes need rebuilding
    getStore()?.markDirty()
  })

  const getIsMouseActive = useIsMouseActive(host)

  const handleMouseAction = () => {
    const store = getStore()
    if (!store) return
    if (getDisabled()) return
    if (!getIsMouseActive()) return
    store.setHighlightedValue(getValue())
  }

  useEventListener(host, 'mouseenter', handleMouseAction)
  useEventListener(host, 'mousedown', handleMouseAction)
}

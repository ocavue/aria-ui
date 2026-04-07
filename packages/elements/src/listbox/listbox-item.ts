import type { HostElement } from '@aria-ui/core'
import {
  computed,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  useEventListener,
  type Store,
} from '@aria-ui/core'
import { Collection, useAriaDisabled, useAriaSelected, useAttribute, getCollectionItemValue } from '@aria-ui/utils'

import { SelectEvent } from '../events/index.ts'

import { ListboxStoreContext } from './listbox-store.ts'

export { SelectEvent }

/**
 * @public
 */
export interface ListboxItemProps {
  /**
   * The unique value for this option.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this option is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @public
 */
export interface ListboxItemEvents {
  /**
   * Emitted when the the item is selected.
   */
  select: SelectEvent
}

/**
 * @internal
 */
export const ListboxItemPropsDeclaration = defineProps<ListboxItemProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @internal
 */
export function setupListboxItem(host: HostElement, props: Store<ListboxItemProps>) {
  onMount(host, () => {
    host.role = 'option'
  })

  const getStore = ListboxStoreContext.consume(host)

  useEffect(host, () => {
    const propValue = props.value.get()
    if (propValue) {
      return
    }

    const itemValue = getCollectionItemValue(host)
    if (itemValue) {
      props.value.set(itemValue)
    }
  })

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  useAriaDisabled(host, () => props.disabled.get())
  useAriaSelected(host, () => {
    const store = getStore()
    if (!store) return false
    return store.selectedValues.get().includes(props.value.get())
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return

    const query = store.query.get()
    const filter = store.filter.get()

    if (filter == null) {
      host.hidden = false
    } else {
      const value = props.value.get()
      host.hidden = !filter({ value, query })
    }
  })

  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const root = host.closest('[role="listbox"]')
    if (!root) return
    const itemElements = root.querySelectorAll<HTMLElement>('[role="option"]:not([hidden])')
    store.collection.set(new Collection(itemElements))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    const store = getStore()
    store?.query.get()
    store?.filter.get()
    rebuildCollection()
  })

  const getIsHighlighted = computed((): boolean => {
    const store = getStore()
    if (!store) return false
    const value = props.value.get()
    return store.highlightedValue.get() === value
  })
  useAttribute(host, 'data-highlighted', () => (getIsHighlighted() ? '' : undefined))

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    const value = props.value.get()
    store.highlightedValue.set(value)

    const current = store.selectedValues.get()
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    store.emitSelectionChange(next)
    host.dispatchEvent(new SelectEvent())
  })

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.highlightedValue.set(props.value.get())
  })
}

/**
 * @public
 */
export class ListboxItemElement extends defineCustomElement(
  setupListboxItem,
  ListboxItemPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerListboxItemElement(): void {
  registerCustomElement('aria-ui-listbox-item', ListboxItemElement)
}

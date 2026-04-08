import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  useEventListener,
  type Store,
} from '@aria-ui/core'
import { setupCollectionItem, useAriaSelected } from '@aria-ui/utils'

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

  const { rebuildCollection } = setupCollectionItem(host, props, {
    getStore,
    containerSelector: '[role="listbox"]',
    itemSelector: '[role="option"]:not([hidden])',
    filterToLevel: false,
  })

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

  useEffect(host, () => {
    const store = getStore()
    store?.query.get()
    store?.filter.get()
    rebuildCollection()
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    const value = props.value.get()
    store.setHighlightedValue(value)

    const current = store.selectedValues.get()
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    store.emitSelectionChange(next)
    host.dispatchEvent(new SelectEvent())
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

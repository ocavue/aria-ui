import type { HostElement } from '@aria-ui/core'
import {
  computed,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'
import { setupCollectionItem, useAriaSelected, useEventListener } from '@aria-ui/utils'

import { SelectEvent } from '../events/index.ts'

import { ListboxStoreContext } from './listbox-store.ts'

export { SelectEvent }

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
export function setupListboxItem(host: HostElement, props: State<ListboxItemProps>) {
  onMount(host, () => {
    host.role = 'option'
  })

  const getStore = ListboxStoreContext.consume(host)

  const getVisible = computed(() => {
    const store = getStore()
    if (!store) return true

    const query = store.getQuery()
    const filter = store.getFilter()

    const value = props.value.get()
    return filter ? filter({ value, query }) : true
  })

  setupCollectionItem(host, props, getStore, getVisible)

  useAriaSelected(host, () => {
    const store = getStore()
    if (!store) return false
    return store.selectedValues.get().includes(props.value.get())
  })

  useEffect(host, () => {
    host.hidden = !getVisible()
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
 * `<aria-ui-listbox-item>` custom element.
 *
 * Properties: {@link ListboxItemProps}
 *
 * Events: {@link ListboxItemEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
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

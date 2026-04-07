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
import {
  Collection,
  getCollectionItemValue,
  useAriaDisabled,
  useAttribute,
  useElementId,
} from '@aria-ui/utils'

import { SelectEvent } from '../events/index.ts'

import { closeMenuTree, MenuStoreContext } from './menu-store.ts'

export { SelectEvent }

/**
 * @public
 */
export interface MenuItemProps {
  /**
   * The unique value for this menu item.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this menu item is disabled.
   *
   * @default false
   */
  disabled: boolean

  /**
   * Whether to close the menu when the item is pressed.
   *
   * @default true
   */
  closeOnSelect: boolean
}

/**
 * @internal
 */
export const MenuItemPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuItemProps>({
    value: { default: '', attribute: 'value', type: 'string' },
    disabled: { default: false, attribute: 'disabled', type: 'boolean' },
    closeOnSelect: { default: true, attribute: 'close-on-select', type: 'boolean' },
  })

/**
 * @public
 */
export interface MenuItemEvents {
  /**
   * Emitted when the the item is selected.
   */
  select: SelectEvent
}

/**
 * @internal
 */
export function setupMenuItem(host: HostElement, props: Store<MenuItemProps>) {
  onMount(host, () => {
    host.role = 'menuitem'
  })

  useElementId(host)

  const getStore = MenuStoreContext.consume(host)

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

  useAriaDisabled(host, () => props.disabled.get())

  useAttribute(host, 'data-highlighted', () => {
    const store = getStore()
    if (!store) return undefined
    return store.getHighlightedValue() === props.value.get() ? '' : undefined
  })

  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const popup = host.closest('[role="menu"]')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>('[role="menuitem"]')
    const levelItems = [...allItems].filter((el) => el.closest('[role="menu"]') === popup)
    store.setCollection(new Collection(levelItems))
  }

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
    const store = getStore()
    if (!store) return
    store.setHighlightedValue(props.value.get())
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    const value = props.value.get()
    store.setHighlightedValue(value)

    host.dispatchEvent(new SelectEvent())

    if (props.closeOnSelect.get()) {
      closeMenuTree(store)
    }
  })
}

/**
 * @public
 */
export class MenuItemElement extends defineCustomElement(setupMenuItem, MenuItemPropsDeclaration) {}

/**
 * @internal
 */
export function registerMenuItemElement(): void {
  registerCustomElement('aria-ui-menu-item', MenuItemElement)
}

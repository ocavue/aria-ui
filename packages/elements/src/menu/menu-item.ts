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
import { Collection, useAriaDisabled, useElementId } from '@aria-ui/utils'

import { closeMenuTree, MenuStoreContext } from './menu-store.ts'

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
   * Whether to close the menu when the item is clicked.
   *
   * @default true
   */
  closeOnClick: boolean
}

/**
 * @internal
 */
export const MenuItemPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuItemProps>({
    value: { default: '', attribute: 'value', type: 'string' },
    disabled: { default: false, attribute: 'disabled', type: 'boolean' },
    closeOnClick: { default: true, attribute: 'close-on-click', type: 'boolean' },
  })

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
    host.dataset.value = props.value.get()
  })

  useAriaDisabled(host, () => props.disabled.get())

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const value = props.value.get()
    const isActive = store.getActiveValue() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
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
    store.setActiveValue(props.value.get())
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    store.setActiveValue(props.value.get())

    if (props.closeOnClick.get()) {
      closeMenuTree(store)
    }
  })
}

/**
 * @public
 */
export class MenuItemElement extends defineCustomElement(setupMenuItem, MenuItemPropsDeclaration) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuItemElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-item', MenuItemElement)
}

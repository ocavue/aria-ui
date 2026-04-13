import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  type State,
} from '@aria-ui/core'
import { setupCollectionItem, useElementId, useEventListener } from '@aria-ui/utils'

import { SelectEvent } from '../events/index.ts'

import { closeMenuTree, MenuStoreContext } from './menu-store.ts'

export { SelectEvent }

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

export interface MenuItemEvents {
  /**
   * Emitted when the the item is selected.
   */
  select: SelectEvent
}

/**
 * @internal
 */
export function setupMenuItem(host: HostElement, props: State<MenuItemProps>) {
  onMount(host, () => {
    host.role = 'menuitem'
  })

  useElementId(host)

  const getStore = MenuStoreContext.consume(host)

  setupCollectionItem(host, props, getStore)

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
 * `<aria-ui-menu-item>` custom element.
 *
 * Properties: {@link MenuItemProps}
 *
 * Events: {@link MenuItemEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
export class MenuItemElement extends defineCustomElement(setupMenuItem, MenuItemPropsDeclaration) {}

/**
 * @internal
 */
export function registerMenuItemElement(): void {
  registerCustomElement('aria-ui-menu-item', MenuItemElement)
}

import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'
import { setupCollectionItem, useElementId, useEventListener } from '@aria-ui/utils'

import { setAriaHasPopup } from '../../../utils/src/aria.ts'

import { MenuStoreContext } from './menu-store.ts'

const OPEN_DELAY = 200
const CLOSE_DELAY = 150

export interface MenuSubmenuTriggerProps {
  /**
   * The unique value for this submenu trigger in the parent menu.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this submenu trigger is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuSubmenuTriggerPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuSubmenuTriggerProps>({
    value: { default: '', attribute: 'value', type: 'string' },
    disabled: { default: false, attribute: 'disabled', type: 'boolean' },
  })

/**
 * @internal
 */
export function setupMenuSubmenuTrigger(host: HostElement, props: State<MenuSubmenuTriggerProps>) {
  onMount(host, () => {
    host.role = 'menuitem'
    setAriaHasPopup(host, 'menu')
  })

  useElementId(host)

  const getMenuStore = MenuStoreContext.consume(host)
  const getParentStore = () => getMenuStore()?.getParentStore()
  const getOverlayStore = () => getMenuStore()?.overlayStore

  setupCollectionItem(host, props, getParentStore)

  useEffect(host, () => {
    getMenuStore()?.overlayStore.setAnchorElement(host)
  })

  useEffect(host, () => {
    const store = getOverlayStore()
    if (!store) return
    const open = store.getIsOpen()
    host.setAttribute('aria-expanded', String(open))
  })

  let openTimer: ReturnType<typeof setTimeout> | undefined
  let closeTimer: ReturnType<typeof setTimeout> | undefined

  const clearTimers = () => {
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = undefined
    }
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = undefined
    }
  }

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    clearTimers()

    const store = getOverlayStore()
    if (store && !store.getIsOpen()) {
      openTimer = setTimeout(() => {
        store.requestOpenChange(true)
      }, OPEN_DELAY)
    }
  })

  useEventListener(host, 'mouseleave', (event: MouseEvent) => {
    clearTimers()

    const store = getOverlayStore()
    if (!store || !store.getIsOpen()) return

    const relatedTarget = event.relatedTarget as HTMLElement | null
    const submenuRoot = host.closest('[data-menu-submenu-root]')
    if (submenuRoot && relatedTarget && submenuRoot.contains(relatedTarget)) return

    closeTimer = setTimeout(() => {
      store.requestOpenChange(false)
    }, CLOSE_DELAY)
  })

  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const store = getOverlayStore()
    if (!store) return

    const parentActive = parentStore.getHighlightedValue()
    const myValue = props.value.get()

    if (parentActive !== myValue && store.getIsOpen()) {
      const timer = setTimeout(() => store.requestOpenChange(false), CLOSE_DELAY)
      return () => clearTimeout(timer)
    }
  })

  useEventListener(host, 'aria-ui:open-submenu' as 'click', () => {
    getOverlayStore()?.requestOpenChange(true)
  })

  useEventListener(host, 'click', () => {
    getOverlayStore()?.requestOpenToggle()
  })

  onMount(host, () => clearTimers)
}

/**
 * `<aria-ui-menu-submenu-trigger>` custom element.
 *
 * Properties: {@link MenuSubmenuTriggerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
export class MenuSubmenuTriggerElement extends defineCustomElement(
  setupMenuSubmenuTrigger,
  MenuSubmenuTriggerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerMenuSubmenuTriggerElement(): void {
  registerCustomElement('aria-ui-menu-submenu-trigger', MenuSubmenuTriggerElement)
}

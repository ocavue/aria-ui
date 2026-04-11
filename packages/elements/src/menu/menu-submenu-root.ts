import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'

import type { OpenChangeEvent } from '../overlay/open-change-event.ts'
import type { OverlayRootProps } from '../overlay/overlay-root.ts'
import { OverlayRootPropsDeclaration } from '../overlay/overlay-root.ts'
import { createOverlayStore } from '../overlay/overlay-store.ts'

import { createMenuStore, MenuStoreContext } from './menu-store.ts'

export interface MenuSubmenuRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const MenuSubmenuRootPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuSubmenuRootProps>({
    ...OverlayRootPropsDeclaration,
  })

export interface MenuSubmenuRootEvents {
  /**
   * Emitted when the submenu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuSubmenuRoot(host: HostElement, props: State<MenuSubmenuRootProps>) {
  const getParentStore = MenuStoreContext.consume(host)
  const overlayStore = createOverlayStore(
    props.open.get,
    props.open.set,
    props.defaultOpen.get,
    props.disabled.get,
    (event) => {
      host.dispatchEvent(event)
    },
  )
  onMount(host, () => {
    host.dataset.menuSubmenuRoot = ''
  })
  const menuStore = createMenuStore(overlayStore, getParentStore)
  MenuStoreContext.provide(host, menuStore)

  useEffect(host, () => {
    const parentMenuStore = getParentStore()
    const parentOverlayStore = parentMenuStore?.overlayStore
    if (!parentOverlayStore) return
    if (parentOverlayStore.getIsOpen() === false) {
      overlayStore.requestOpenChange(false)
    }
  })
}

/**
 * `<aria-ui-menu-submenu-root>` custom element.
 *
 * Properties: {@link MenuSubmenuRootProps}
 *
 * Events: {@link MenuSubmenuRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-menu-submenu-root` | Always present on the element |
 */
export class MenuSubmenuRootElement extends defineCustomElement(
  setupMenuSubmenuRoot,
  MenuSubmenuRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerMenuSubmenuRootElement(): void {
  registerCustomElement('aria-ui-menu-submenu-root', MenuSubmenuRootElement)
}

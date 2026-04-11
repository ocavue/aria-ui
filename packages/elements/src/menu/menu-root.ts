import type { HostElement } from '@aria-ui/core'
import {
  computed,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  type State,
} from '@aria-ui/core'
import { useAriaDisabled } from '@aria-ui/utils'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, type OverlayRootProps } from '../overlay/overlay-root.ts'
import { createOverlayStore } from '../overlay/overlay-store.ts'

import { createMenuStore, MenuStoreContext } from './menu-store.ts'

export { OpenChangeEvent }

export interface MenuRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const MenuRootPropsDeclaration = defineProps<MenuRootProps>({
  ...OverlayRootPropsDeclaration,
})

export interface MenuRootEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuRoot(host: HostElement, props: State<MenuRootProps>) {
  const getDisabled = computed(() => props.disabled.get())

  const overlayStore = createOverlayStore(
    props.open.get,
    props.open.set,
    props.defaultOpen.get,
    getDisabled,
    (event) => host.dispatchEvent(event),
  )
  const menuStore = createMenuStore(overlayStore)

  onMount(host, () => {
    host.dataset.menuRoot = ''
  })
  useAriaDisabled(host, getDisabled)
  MenuStoreContext.provide(host, menuStore)
}

/**
 * `<aria-ui-menu-root>` custom element.
 *
 * Properties: {@link MenuRootProps}
 *
 * Events: {@link MenuRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-menu-root` | Always present on the element |
 */
export class MenuRootElement extends defineCustomElement(setupMenuRoot, MenuRootPropsDeclaration) {}

/**
 * @internal
 */
export function registerMenuRootElement(): void {
  registerCustomElement('aria-ui-menu-root', MenuRootElement)
}

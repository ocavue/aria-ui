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
import {
  setAriaHasPopup,
  useAriaControls,
  useAriaDisabled,
  useAriaExpanded,
  usePress,
} from '@aria-ui/utils'

import type { OpenChangeEvent } from '../overlay/open-change-event.ts'

import { MenuStoreContext } from './menu-store.ts'

export interface MenuTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuTriggerPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuTriggerProps>({
    disabled: {
      default: false,
      attribute: 'disabled',
      type: 'boolean',
    },
  })

export interface MenuTriggerEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuTrigger(host: HostElement, props: State<MenuTriggerProps>) {
  const getDisabled = props.disabled.get
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = computed(() => getMenuStore()?.overlayStore)
  const getOpen = computed(() => getOverlayStore()?.getIsOpen())
  const getPopupId = computed(() => getOverlayStore()?.getPopupId())

  usePress(host, () => {
    if (getDisabled()) return
    getOverlayStore()?.requestOpenToggle()
  })

  useEffect(host, () => {
    getOverlayStore()?.setAnchorElement(host)
  })

  useAriaExpanded(host, getOpen)
  useAriaDisabled(host, getDisabled)

  const getAriaControls = computed(() => (getOpen() ? getPopupId() : undefined))
  useAriaControls(host, getAriaControls)

  onMount(host, () => {
    setAriaHasPopup(host, 'menu')
  })
}

/**
 * `<aria-ui-menu-trigger>` custom element.
 *
 * Properties: {@link MenuTriggerProps}
 *
 * Events: {@link MenuTriggerEvents}
 */
export class MenuTriggerElement extends defineCustomElement(
  setupMenuTrigger,
  MenuTriggerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerMenuTriggerElement(): void {
  registerCustomElement('aria-ui-menu-trigger', MenuTriggerElement)
}

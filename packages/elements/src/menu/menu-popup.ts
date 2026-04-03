import type { HostElement, TypedEventTarget } from '@aria-ui/core'
import {
  computed,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type Store,
} from '@aria-ui/core'
import {
  getAriaHasPopup,
  handleCollectionNavigation,
  useAriaActivedescendant,
  useElementId,
} from '@aria-ui/utils'
import { trackDismissableElement } from '@zag-js/dismissable'
import { isHTMLElement } from '@zag-js/dom-query'

import { closeMenuTree, MenuStoreContext, type MenuStore } from './menu-store.ts'

/**
 * @public
 */
export interface MenuPopupProps {
  /**
   * By default, the MenuPopup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | null
}

/**
 * @internal
 */
export const MenuPopupPropsDeclaration =
  /* @__PURE__ */ defineProps<MenuPopupProps>({
    eventTarget: { default: null, attribute: false, type: 'json' },
  })

/**
 * @internal
 */
export function setupMenuPopup(host: HostElement, props: Store<MenuPopupProps>) {
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = computed(() => getMenuStore()?.overlayStore)
  const id = useElementId(host)

  useEffect(host, () => {
    getOverlayStore()?.setPopupId(id)
  })

  onMount(host, () => {
    host.role = 'menu'
    host.tabIndex = 0
  })

  useEffect(host, () => {
    const overlayStore = getOverlayStore()
    if (!overlayStore) return
    host.dataset.state = overlayStore.getIsOpen() ? 'open' : 'closed'
  })

  useAriaActivedescendant(host, () => {
    const menuStore = getMenuStore()
    if (!menuStore) return undefined
    const highlightedValue = menuStore.getHighlightedValue()
    if (highlightedValue == null) return undefined
    return menuStore.getCollection().getElement(highlightedValue)?.id
  })

  useEffect(host, () => {
    const menuStore = getMenuStore()
    const overlayStore = getOverlayStore()
    if (!overlayStore || !menuStore) return
    const open = overlayStore.getIsOpen()

    if (open) {
      resetTypeahead()
      requestAnimationFrame(() => {
        host.focus()
        const collection = menuStore.getCollection()
        menuStore.setHighlightedValue(collection.first())
      })
    } else {
      menuStore.setHighlightedValue(null)
    }
  })

  const handleKeydown = (event: KeyboardEvent) => {
    // Handle Escape before defaultPrevented check, because
    // trackDismissableElement's capture-phase handler may have
    // already called preventDefault().
    if (event.key === 'Escape' && !event.isComposing) {
      const overlayStore = getOverlayStore()
      if (overlayStore?.getIsOpen()) {
        event.preventDefault()
        event.stopPropagation()
        overlayStore.requestOpenChange(false)
        return
      }
    }

    if (event.isComposing || event.defaultPrevented) return

    const menuStore = getMenuStore()
    const overlayStore = getOverlayStore()
    const parentStore = menuStore?.getParentStore()
    if (!menuStore || !overlayStore) return
    if (!overlayStore.getIsOpen()) return

    if (
      handleCollectionNavigation(
        event,
        menuStore.getCollection(),
        () => menuStore.getHighlightedValue(),
        (v) => menuStore.setHighlightedValue(v),
        'vertical',
        true,
      )
    )
      return

    const currentValue = menuStore.getHighlightedValue()
    const collection = menuStore.getCollection()

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl && getAriaHasPopup(activeEl) === 'menu') {
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          } else {
            activateItem(menuStore, currentValue)
          }
        }
        return

      case 'ArrowRight': {
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl) {
            event.preventDefault()
            event.stopPropagation()
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          }
        }
        return
      }

      case 'ArrowLeft': {
        if (parentStore) {
          event.preventDefault()
          event.stopPropagation()
          parentStore.overlayStore.requestOpenChange(false)
        }
        return
      }

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.stopPropagation()
          handleTypeahead(event.key, menuStore)
        }
        return
    }
  }

  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  // TODO: revisit this
  onMount(host, () => {
    const exclude = () => {
      const anchorElement = getOverlayStore()?.getAnchorElement()
      return anchorElement && isHTMLElement(anchorElement) ? [anchorElement] : []
    }

    return trackDismissableElement(host, {
      type: 'menu',
      exclude,
      onEscapeKeyDown(event) {
        // Escape is handled by the keydown handler, not by dismissable.
        event.preventDefault()
      },
      onPointerDownOutside(event) {
        if (!getOverlayStore()?.getIsOpen()) event.preventDefault()
      },
      onFocusOutside(event) {
        if (!getOverlayStore()?.getIsOpen()) event.preventDefault()
      },
      onDismiss() {
        const menuStore = getMenuStore()
        if (menuStore) closeMenuTree(menuStore)
      },
    })
  })
}

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
const TYPEAHEAD_TIMEOUT = 500

function resetTypeahead() {
  typeaheadBuffer = ''
  if (typeaheadTimer) {
    clearTimeout(typeaheadTimer)
    typeaheadTimer = null
  }
}

function handleTypeahead(char: string, menuStore: MenuStore) {
  if (typeaheadTimer) clearTimeout(typeaheadTimer)

  typeaheadBuffer += char.toLowerCase()
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, TYPEAHEAD_TIMEOUT)

  const collection = menuStore.getCollection()
  const values = collection.getValues()

  for (const value of values) {
    if (value.toLowerCase().startsWith(typeaheadBuffer)) {
      menuStore.setHighlightedValue(value)
      break
    }
  }
}

function activateItem(menuStore: MenuStore, value: string) {
  const element = menuStore.getCollection().getElement(value)
  if (!element) return

  element.click()
}

/**
 * @public
 */
export class MenuPopupElement extends defineCustomElement(
  setupMenuPopup,
  MenuPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-popup', MenuPopupElement)
}

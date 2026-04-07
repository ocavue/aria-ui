import type { HostElement } from '@aria-ui/core'
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

import { setupOverlayPopup } from '../overlay/index.ts'

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
  eventTarget: HTMLElement | EventTarget | null
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

  setupOverlayPopup(host, getOverlayStore)

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
      const id = requestAnimationFrame(() => {
        host.focus()
        const collection = menuStore.getCollection()
        menuStore.setHighlightedValue(collection.first())
      })
      return () => cancelAnimationFrame(id)
    } else {
      menuStore.setHighlightedValue(null)
    }
  })

  const handleKeydown = (event: KeyboardEvent) => {
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

    const highlightedValue = menuStore.getHighlightedValue()
    const collection = menuStore.getCollection()

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()
        if (highlightedValue != null) {
          const highlightedElement = collection.getElement(highlightedValue)
          if (highlightedElement && getAriaHasPopup(highlightedElement) === 'menu') {
            highlightedElement.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          } else if (highlightedElement) {
            highlightedElement.click()
          }
        }
        return

      case 'ArrowRight': {
        if (highlightedValue != null) {
          const highlightedElement = collection.getElement(highlightedValue)
          if (highlightedElement) {
            event.preventDefault()
            event.stopPropagation()
            highlightedElement.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
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
    const abortController = new AbortController()
    const target: HTMLElement | EventTarget = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener, {
      signal: abortController.signal,
    })
    return () => {
      abortController.abort()
    }
  })

  const getIsOpen = () => {
    const store = getOverlayStore()
    if (!store) return false
    return store.getIsOpen()
  }

  // TODO: revisit this
  useEffect(host, () => {
    if (!getIsOpen()) return

    const exclude = () => {
      const anchorElement = getOverlayStore()?.getAnchorElement()
      return anchorElement && isHTMLElement(anchorElement) ? [anchorElement] : []
    }

    let shouldCloseMenuTree = false

    return trackDismissableElement(host, {
      type: 'menu',
      exclude,
      onEscapeKeyDown() {
        shouldCloseMenuTree = false
      },
      onPointerDownOutside() {
        shouldCloseMenuTree = true
      },
      onFocusOutside() {
        shouldCloseMenuTree = true
      },
      onDismiss() {
        const menuStore = getMenuStore()
        if (menuStore && shouldCloseMenuTree) {
          closeMenuTree(menuStore)
        }
        const overlayStore = getOverlayStore()
        if (overlayStore?.getIsOpen()) {
          overlayStore.requestOpenChange(false)
        }
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

/**
 * @public
 */
export class MenuPopupElement extends defineCustomElement(
  setupMenuPopup,
  MenuPopupPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerMenuPopupElement(): void {
  registerCustomElement('aria-ui-menu-popup', MenuPopupElement)
}

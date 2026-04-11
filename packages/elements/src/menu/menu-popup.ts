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
  getAriaHasPopup,
  handleCollectionNavigation,
  useAriaActivedescendant,
  useElementId,
} from '@aria-ui/utils'
import { trackDismissableElement } from '@zag-js/dismissable'
import { isHTMLElement } from '@zag-js/dom-query'

import { setupOverlayPopup } from '../overlay/index.ts'

import { closeMenuTree, MenuStoreContext, type MenuStore } from './menu-store.ts'

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
    eventTarget: { default: null, attribute: false },
  })

/**
 * @internal
 */
export function setupMenuPopup(host: HostElement, props: State<MenuPopupProps>) {
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = computed(() => getMenuStore()?.overlayStore)
  const id = useElementId(host)

  useEffect(host, () => {
    getOverlayStore()?.setPopupId(id)
  })

  onMount(host, () => {
    host.role = 'menu'
    // Make the menu programmatically focusable (so `host.focus()` below works
    // when the popup opens) but keep it OUT of the page tab sequence. A menu
    // popup is a transient overlay opened from a trigger button; pressing Tab
    // while focus is in the menu should close it and move focus to the next
    // focusable element on the page, not land on the menu container itself.
    //
    // Per WAI-ARIA APG Menu Button pattern, focus moves to the menu when it
    // opens and returns to the trigger when it closes — the menu is never a
    // standalone tab stop.
    // https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
    host.tabIndex = -1
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
      menuStore.setHighlightedValue(undefined)
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
      case ' ': {
        if (highlightedValue == null) return
        const highlightedElement = collection.getElement(highlightedValue)
        if (!highlightedElement) return

        event.preventDefault()
        event.stopPropagation()
        if (getAriaHasPopup(highlightedElement) === 'menu') {
          highlightedElement.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
        } else {
          highlightedElement.click()
        }
        return
      }

      case 'ArrowRight': {
        if (highlightedValue == null) return
        const highlightedElement = collection.getElement(highlightedValue)
        if (!highlightedElement) return

        event.preventDefault()
        event.stopPropagation()
        highlightedElement.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
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

      default: {
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.stopPropagation()
          handleTypeahead(event.key, menuStore)
        }
        return
      }
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
let typeaheadTimer: ReturnType<typeof setTimeout> | undefined
const TYPEAHEAD_TIMEOUT = 500

function resetTypeahead() {
  typeaheadBuffer = ''
  if (typeaheadTimer) {
    clearTimeout(typeaheadTimer)
    typeaheadTimer = undefined
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
 * `<aria-ui-menu-popup>` custom element.
 *
 * Properties: {@link MenuPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
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

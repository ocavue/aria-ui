import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { page, type Locator } from 'vitest/browser'

import { registerElements } from '../index.ts'

const MENU_TEMPLATE = html`
  <aria-ui-menu-root>
    <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open Menu</aria-ui-menu-trigger>
    <aria-ui-menu-positioner>
      <aria-ui-menu-popup data-testid="popup">
        <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
        <aria-ui-menu-item value="copy" data-testid="copy">Copy</aria-ui-menu-item>
        <aria-ui-menu-item value="paste" data-testid="paste">Paste</aria-ui-menu-item>
      </aria-ui-menu-popup>
    </aria-ui-menu-positioner>
  </aria-ui-menu-root>
`

function renderMenu(template = MENU_TEMPLATE) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

function getMenu() {
  return {
    trigger: page.getByTestId('trigger'),
    popup: page.getByTestId('popup'),
  }
}

function getSubmenu() {
  return {
    trigger: page.getByTestId('share-trigger'),
    popup: page.getByTestId('sub-popup'),
  }
}

async function openMenu() {
  const { trigger, popup } = getMenu()
  await trigger.click()
  await expect.element(popup).toHaveAttribute('data-state', 'open')
}

// The menu's keydown listener is attached to the popup host (see menu-popup.ts),
// not to document. Dispatching the event directly on the popup is the most
// reliable way to drive keyboard navigation in tests.
function pressKey(popup: Locator, key: string) {
  popup
    .element()
    .dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
}

describe('Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders menu elements', async () => {
      renderMenu()
      await expect.element(page.getByTestId('trigger')).toBeInTheDocument()
      await expect.element(page.getByTestId('popup')).toBeInTheDocument()
      await expect.element(page.getByTestId('cut')).toBeInTheDocument()
    })

    test('menu popup is hidden by default', async () => {
      renderMenu()
      await expect.element(page.getByTestId('popup')).not.toBeVisible()
    })

    test('menu popup shows with defaultOpen=true', async () => {
      renderMenu(html`
        <aria-ui-menu-root .defaultOpen=${true}>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await expect.element(page.getByTestId('popup')).toBeVisible()
    })

    test('menu popup has role="menu"', async () => {
      renderMenu()
      await expect.element(page.getByTestId('popup')).toHaveAttribute('role', 'menu')
    })

    test('menu items have role="menuitem"', async () => {
      renderMenu()
      await expect.element(page.getByTestId('cut')).toHaveAttribute('role', 'menuitem')
      await expect.element(page.getByTestId('copy')).toHaveAttribute('role', 'menuitem')
    })
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens menu', async () => {
      renderMenu()
      await openMenu()
      await expect.element(page.getByTestId('popup')).toBeVisible()
    })

    test('clicking trigger again closes menu', async () => {
      renderMenu()
      const { trigger, popup } = getMenu()
      await openMenu()
      await trigger.click()
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })

    test('trigger has aria-haspopup="menu"', async () => {
      renderMenu()
      await expect.element(page.getByTestId('trigger')).toHaveAttribute('aria-haspopup', 'menu')
    })

    test('trigger has aria-expanded="false" when closed', async () => {
      renderMenu()
      await expect.element(page.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'false')
    })

    test('trigger has aria-expanded="true" when open', async () => {
      renderMenu()
      await openMenu()
      await expect.element(page.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'true')
    })

    test('disabled trigger does not open menu', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger .disabled=${true} tabindex="0" data-testid="trigger"
            >Open</aria-ui-menu-trigger
          >
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await page.getByTestId('trigger').click()
      await expect.element(page.getByTestId('popup')).not.toBeVisible()
    })
  })

  describe('Keyboard Navigation', () => {
    test('opening menu highlights first item', async () => {
      renderMenu()
      await openMenu()
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
    })

    test('ArrowDown moves to next item', async () => {
      renderMenu()
      await openMenu()
      pressKey(getMenu().popup, 'ArrowDown')
      await expect.element(page.getByTestId('copy')).toHaveAttribute('data-highlighted', '')
    })

    test('ArrowUp moves to previous item', async () => {
      renderMenu()
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowUp')
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
    })

    test('Home moves to first item', async () => {
      renderMenu()
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'End')
      pressKey(popup, 'Home')
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
    })

    test('End moves to last item', async () => {
      renderMenu()
      await openMenu()
      pressKey(getMenu().popup, 'End')
      await expect.element(page.getByTestId('paste')).toHaveAttribute('data-highlighted', '')
    })

    test('navigation wraps around (loop)', async () => {
      renderMenu()
      await openMenu()
      pressKey(getMenu().popup, 'ArrowUp')
      await expect.element(page.getByTestId('paste')).toHaveAttribute('data-highlighted', '')
    })

    test('skips disabled items', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" data-testid="a">A</aria-ui-menu-item>
              <aria-ui-menu-item value="b" .disabled=${true} data-testid="b">B</aria-ui-menu-item>
              <aria-ui-menu-item value="c" data-testid="c">C</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await openMenu()
      pressKey(getMenu().popup, 'ArrowDown')
      await expect.element(page.getByTestId('c')).toHaveAttribute('data-highlighted', '')
    })
  })

  describe('Item Activation', () => {
    test('Enter activates highlighted item and closes menu', async () => {
      renderMenu()
      await openMenu()
      const onSelect = vi.fn()
      page.getByTestId('cut').element().addEventListener('select', onSelect)
      const { popup } = getMenu()
      pressKey(popup, 'Enter')
      await vi.waitFor(() => expect(onSelect).toHaveBeenCalled())
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })

    test('Space activates highlighted item and closes menu', async () => {
      renderMenu()
      await openMenu()
      const onSelect = vi.fn()
      page.getByTestId('cut').element().addEventListener('select', onSelect)
      const { popup } = getMenu()
      pressKey(popup, ' ')
      await vi.waitFor(() => expect(onSelect).toHaveBeenCalled())
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })

    test('clicking item activates it and closes menu', async () => {
      renderMenu()
      await openMenu()
      const onSelect = vi.fn()
      page.getByTestId('copy').element().addEventListener('select', onSelect)
      await page.getByTestId('copy').click()
      await vi.waitFor(() => expect(onSelect).toHaveBeenCalled())
      await expect.element(getMenu().popup).toHaveAttribute('data-state', 'closed')
    })

    test('closeOnSelect=false keeps menu open after click', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" .closeOnSelect=${false} data-testid="a"
                >A</aria-ui-menu-item
              >
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await openMenu()
      await page.getByTestId('a').click()
      await expect.element(getMenu().popup).toHaveAttribute('data-state', 'open')
    })

    test('disabled item cannot be activated via click', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" .disabled=${true} data-testid="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await openMenu()
      // Playwright's locator.click() refuses to interact with disabled elements
      // (it waits for actionability). Bypass via dispatchEvent because that is
      // exactly what this test exercises: that a synthetic click on a disabled
      // item is a no-op.
      page
        .getByTestId('a')
        .element()
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await expect.element(getMenu().popup).toHaveAttribute('data-state', 'open')
    })
  })

  describe('Close Behaviors', () => {
    test('Escape closes menu', async () => {
      renderMenu()
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'Escape')
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })
  })

  describe('Typeahead', () => {
    test('typing a character highlights matching item', async () => {
      renderMenu()
      await openMenu()
      pressKey(getMenu().popup, 'p')
      await expect.element(page.getByTestId('paste')).toHaveAttribute('data-highlighted', '')
    })

    test('typing multiple characters narrows match', async () => {
      renderMenu()
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'c')
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
      pressKey(popup, 'o')
      await expect.element(page.getByTestId('copy')).toHaveAttribute('data-highlighted', '')
    })
  })

  describe('Accessibility', () => {
    test('disabled items have aria-disabled', async () => {
      renderMenu(html`
        <aria-ui-menu-root>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup">
              <aria-ui-menu-item value="a" .disabled=${true} data-testid="a">A</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)
      await expect.element(page.getByTestId('a')).toHaveAttribute('aria-disabled', 'true')
    })

    test('active item has data-highlighted attribute', async () => {
      renderMenu()
      await openMenu()
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
      await expect.element(page.getByTestId('copy')).not.toHaveAttribute('data-highlighted')
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = renderMenu()
      const root = container.querySelector('aria-ui-menu-root')!
      const onOpenChange = vi.fn()
      root.addEventListener('openChange', onOpenChange)
      await page.getByTestId('trigger').click()
      expect(onOpenChange).toHaveBeenCalled()
    })

    test('emits openChange event when closed', async () => {
      const container = renderMenu()
      await openMenu()
      const root = container.querySelector('aria-ui-menu-root')!
      const onOpenChange = vi.fn()
      root.addEventListener('openChange', onOpenChange)
      await page.getByTestId('trigger').click()
      expect(onOpenChange).toHaveBeenCalled()
    })
  })

  describe('Custom eventTarget', () => {
    test('keydown events from custom eventTarget trigger navigation', async () => {
      const customTarget = document.createElement('div')
      document.body.appendChild(customTarget)

      renderMenu(html`
        <aria-ui-menu-root .defaultOpen=${true}>
          <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open</aria-ui-menu-trigger>
          <aria-ui-menu-positioner>
            <aria-ui-menu-popup data-testid="popup" .eventTarget=${customTarget}>
              <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
              <aria-ui-menu-item value="copy" data-testid="copy">Copy</aria-ui-menu-item>
            </aria-ui-menu-popup>
          </aria-ui-menu-positioner>
        </aria-ui-menu-root>
      `)

      await expect.element(page.getByTestId('popup')).toHaveAttribute('data-state', 'open')
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')

      // customTarget is not a locatable element — dispatch directly is the
      // entire point of this test (it verifies the eventTarget forwarding).
      customTarget.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      await expect.element(page.getByTestId('copy')).toHaveAttribute('data-highlighted', '')
    })
  })

  // ---- Submenu tests ----

  const SUBMENU_TEMPLATE = html`
    <aria-ui-menu-root>
      <aria-ui-menu-trigger tabindex="0" data-testid="trigger">Open Menu</aria-ui-menu-trigger>
      <aria-ui-menu-positioner>
        <aria-ui-menu-popup data-testid="popup">
          <aria-ui-menu-item value="cut" data-testid="cut">Cut</aria-ui-menu-item>
          <aria-ui-menu-submenu-root>
            <aria-ui-menu-submenu-trigger value="share" data-testid="share-trigger"
              >Share</aria-ui-menu-submenu-trigger
            >
            <aria-ui-menu-positioner placement="right-start">
              <aria-ui-menu-popup data-testid="sub-popup">
                <aria-ui-menu-item value="email" data-testid="email">Email</aria-ui-menu-item>
                <aria-ui-menu-item value="slack" data-testid="slack">Slack</aria-ui-menu-item>
              </aria-ui-menu-popup>
            </aria-ui-menu-positioner>
          </aria-ui-menu-submenu-root>
          <aria-ui-menu-item value="delete" data-testid="delete">Delete</aria-ui-menu-item>
        </aria-ui-menu-popup>
      </aria-ui-menu-positioner>
    </aria-ui-menu-root>
  `

  describe('Submenu: Basic', () => {
    test('submenu trigger renders with role="menuitem"', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await expect.element(page.getByTestId('share-trigger')).toHaveAttribute('role', 'menuitem')
    })

    test('submenu trigger has aria-haspopup="menu"', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('aria-haspopup', 'menu')
    })

    test('submenu trigger has aria-expanded="false" by default', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('aria-expanded', 'false')
    })

    test('submenu popup is hidden by default', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await expect.element(page.getByTestId('sub-popup')).not.toBeVisible()
    })

    test('submenu trigger participates in parent keyboard navigation', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      pressKey(getMenu().popup, 'ArrowDown')
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('data-highlighted', '')
    })
  })

  describe('Submenu: Opening', () => {
    test('ArrowRight on highlighted submenu trigger opens submenu', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowDown')
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('data-highlighted', '')
      pressKey(popup, 'ArrowRight')
      await expect.element(getSubmenu().popup).toHaveAttribute('data-state', 'open')
    })

    test('Enter on highlighted submenu trigger opens submenu', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowDown')
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('data-highlighted', '')
      pressKey(popup, 'Enter')
      await expect.element(getSubmenu().popup).toHaveAttribute('data-state', 'open')
    })

    test('opening submenu highlights first item in submenu', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowDown')
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('data-highlighted', '')
      pressKey(popup, 'ArrowRight')
      await expect.element(page.getByTestId('email')).toHaveAttribute('data-highlighted', '')
    })

    test('submenu trigger aria-expanded becomes "true" when submenu opens', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect
        .element(page.getByTestId('share-trigger'))
        .toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Submenu: Closing', () => {
    test('ArrowLeft inside submenu closes it', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect.element(subPopup).toHaveAttribute('data-state', 'open')
      pressKey(subPopup, 'ArrowLeft')
      await expect.element(subPopup).toHaveAttribute('data-state', 'closed')
    })

    test('Escape inside submenu closes submenu only (parent stays open)', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect.element(subPopup).toHaveAttribute('data-state', 'open')
      pressKey(subPopup, 'Escape')
      await expect.element(subPopup).toHaveAttribute('data-state', 'closed')
      await expect.element(popup).toHaveAttribute('data-state', 'open')
    })

    test('clicking a regular item in submenu closes entire menu tree', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect.element(subPopup).toHaveAttribute('data-state', 'open')
      await page.getByTestId('email').click()
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })

    test('closing parent menu cascades to close submenu', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect.element(subPopup).toHaveAttribute('data-state', 'open')
      pressKey(popup, 'Escape')
      await expect.element(subPopup).toHaveAttribute('data-state', 'closed')
      await expect.element(popup).toHaveAttribute('data-state', 'open')

      pressKey(popup, 'Escape')
      await expect.element(subPopup).toHaveAttribute('data-state', 'closed')
      await expect.element(popup).toHaveAttribute('data-state', 'closed')
    })
  })

  describe('Submenu: Navigation', () => {
    test('ArrowDown/Up inside submenu navigates within submenu only', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()
      pressKey(popup, 'ArrowDown')
      pressKey(popup, 'ArrowRight')
      await expect.element(page.getByTestId('email')).toHaveAttribute('data-highlighted', '')
      pressKey(subPopup, 'ArrowDown')
      await expect.element(page.getByTestId('slack')).toHaveAttribute('data-highlighted', '')
    })

    test('ArrowRight on non-submenu-trigger item does nothing', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
      const { popup } = getMenu()
      pressKey(popup, 'ArrowRight')
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
      await expect.element(getSubmenu().popup).not.toHaveAttribute('data-state', 'open')
    })

    test('hovering item1 keeps submenu closed, hovering submenu trigger opens it, hovering back to item1 closes submenu but keeps menu open', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      const { popup: subPopup } = getSubmenu()

      // Hover over item1 (cut) — submenu should NOT open
      await page.getByTestId('cut').hover()
      await expect.element(page.getByTestId('cut')).toHaveAttribute('data-highlighted', '')
      await expect.element(subPopup).not.toHaveAttribute('data-state', 'open')

      // Hover over submenu trigger (share) — submenu should open after delay
      await page.getByTestId('share-trigger').hover()
      await expect.element(subPopup).toHaveAttribute('data-state', 'open')

      // Hover back to item1 (cut) — submenu should close, but parent menu stays open
      await page.getByTestId('cut').hover()
      await expect.element(subPopup).toHaveAttribute('data-state', 'closed')
      await expect.element(popup).toHaveAttribute('data-state', 'open')
    })

    test('ArrowLeft in root menu does nothing', async () => {
      renderMenu(SUBMENU_TEMPLATE)
      await openMenu()
      const { popup } = getMenu()
      pressKey(popup, 'ArrowLeft')
      await expect.element(popup).toHaveAttribute('data-state', 'open')
    })
  })
})

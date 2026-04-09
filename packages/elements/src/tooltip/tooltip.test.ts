import { html, render, type TemplateResult } from 'lit-html'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

function renderTooltip(template: TemplateResult) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

function getTooltip() {
  return {
    trigger: page.getByTestId('trigger'),
    popup: page.getByTestId('popup'),
  }
}

const TOOLTIP_TEMPLATE = html`
  <aria-ui-tooltip-root>
    <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
    <aria-ui-tooltip-positioner>
      <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
    </aria-ui-tooltip-positioner>
  </aria-ui-tooltip-root>
`

const TOOLTIP_ZERO_DELAY = html`
  <aria-ui-tooltip-root>
    <aria-ui-tooltip-trigger .openDelay=${0} data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
    <aria-ui-tooltip-positioner>
      <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
    </aria-ui-tooltip-positioner>
  </aria-ui-tooltip-root>
`

const TOOLTIP_DEFAULT_OPEN = html`
  <aria-ui-tooltip-root .defaultOpen=${true}>
    <aria-ui-tooltip-trigger .openDelay=${0} data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
    <aria-ui-tooltip-positioner>
      <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
    </aria-ui-tooltip-positioner>
  </aria-ui-tooltip-root>
`

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders tooltip elements', async () => {
      renderTooltip(TOOLTIP_TEMPLATE)
      await expect.element(page.getByText('Trigger')).toBeInTheDocument()
      await expect.element(page.getByText('Tooltip content')).toBeInTheDocument()
    })

    test('popup is hidden by default', async () => {
      renderTooltip(TOOLTIP_TEMPLATE)
      await expect.element(getTooltip().popup).not.toBeVisible()
    })

    test('popup shows with defaultOpen=true', async () => {
      renderTooltip(TOOLTIP_DEFAULT_OPEN)
      await expect.element(getTooltip().popup).toBeVisible()
    })
  })

  describe('Hover Interactions', () => {
    test('hover opens tooltip (with zero delay)', async () => {
      renderTooltip(TOOLTIP_ZERO_DELAY)
      const { trigger, popup } = getTooltip()
      await expect.element(popup).not.toBeVisible()
      await trigger.hover()
      await expect.element(popup).toBeVisible()
    })

    test('mouse leave closes tooltip', async () => {
      renderTooltip(TOOLTIP_DEFAULT_OPEN)
      const { trigger, popup } = getTooltip()
      await expect.element(popup).toBeVisible()
      // The hook listens for synthetic mouseleave; dispatch directly so the
      // test does not depend on cursor position state from prior hovers.
      trigger.element().dispatchEvent(new MouseEvent('mouseleave'))
      await expect.element(popup).not.toBeVisible()
    })

    test('disabled trigger does not open tooltip', async () => {
      renderTooltip(html`
        <aria-ui-tooltip-root>
          <aria-ui-tooltip-trigger .disabled=${true} .openDelay=${0} data-testid="trigger"
            >Trigger</aria-ui-tooltip-trigger
          >
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)
      await getTooltip().trigger.hover()
      await expect.element(getTooltip().popup).not.toBeVisible()
    })
  })

  describe('Focus Interactions', () => {
    test('focus opens tooltip', async () => {
      renderTooltip(TOOLTIP_ZERO_DELAY)
      const { trigger, popup } = getTooltip()
      // Direct dispatch is intentional: the hook listens for the synthetic
      // focusin/focusout pair regardless of real focus traversal.
      trigger.element().dispatchEvent(new FocusEvent('focusin'))
      await expect.element(popup).toBeVisible()
    })

    test('blur closes tooltip', async () => {
      renderTooltip(TOOLTIP_DEFAULT_OPEN)
      const { trigger, popup } = getTooltip()
      await expect.element(popup).toBeVisible()
      trigger.element().dispatchEvent(new FocusEvent('focusout'))
      await expect.element(popup).not.toBeVisible()
    })

    test('tooltip stays open when hover ends but focus remains', async () => {
      renderTooltip(TOOLTIP_ZERO_DELAY)
      const { trigger, popup } = getTooltip()
      const triggerEl = trigger.element()

      triggerEl.dispatchEvent(new MouseEvent('mouseenter'))
      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      await expect.element(popup).toBeVisible()

      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      await expect.element(popup).toBeVisible()

      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      await expect.element(popup).not.toBeVisible()
    })
  })

  describe('Keyboard Interactions', () => {
    test('Escape key closes tooltip', async () => {
      renderTooltip(TOOLTIP_DEFAULT_OPEN)
      const { trigger, popup } = getTooltip()
      await expect.element(popup).toBeVisible()
      trigger.element().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await expect.element(popup).not.toBeVisible()
    })
  })

  describe('Tooltip Group (Shared Delay)', () => {
    test('second tooltip opens instantly after first closes within group timeout', async () => {
      const container = renderTooltip(html`
        <aria-ui-tooltip-root>
          <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-a"
            >Trigger A</aria-ui-tooltip-trigger
          >
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup>Tooltip A</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>

        <aria-ui-tooltip-root>
          <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-b"
            >Trigger B</aria-ui-tooltip-trigger
          >
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup data-testid="popup-b">Tooltip B</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)

      // Open tooltip A via controlled prop, then close it (triggers group notification)
      const rootA = container.querySelector('aria-ui-tooltip-root')!
      rootA.open = true
      rootA.open = false

      // Hover trigger B — should open instantly (group delay skip).
      // dispatchEvent here matches the test for trigger A's controlled-prop path.
      page.getByTestId('trigger-b').element().dispatchEvent(new MouseEvent('mouseenter'))
      await expect.element(page.getByTestId('popup-b')).toBeVisible()
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', async () => {
      const container = renderTooltip(html`
        <aria-ui-tooltip-root .open=${true}>
          <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)

      const popup = page.getByTestId('popup')
      await expect.element(popup).toBeVisible()

      const rootElement = container.querySelector('aria-ui-tooltip-root')!
      rootElement.open = false
      await expect.element(popup).not.toBeVisible()
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = renderTooltip(TOOLTIP_ZERO_DELAY)
      const root = container.querySelector('aria-ui-tooltip-root')!
      const onOpenChange = vi.fn()
      root.addEventListener('openChange', onOpenChange)

      await getTooltip().trigger.hover()
      expect(onOpenChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    test('popup has role tooltip', async () => {
      renderTooltip(TOOLTIP_TEMPLATE)
      await expect.element(getTooltip().popup).toHaveAttribute('role', 'tooltip')
    })

    test('trigger has aria-describedby when tooltip is open', async () => {
      renderTooltip(html`
        <aria-ui-tooltip-root .open=${true}>
          <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)
      const { trigger, popup } = getTooltip()
      const popupId = popup.element().id
      await expect.element(trigger).toHaveAttribute('aria-describedby', popupId)
    })

    test('trigger does not have aria-describedby when tooltip is closed', async () => {
      renderTooltip(TOOLTIP_TEMPLATE)
      await expect.element(getTooltip().trigger).not.toHaveAttribute('aria-describedby')
    })

    test('disabled elements have aria-disabled', async () => {
      renderTooltip(html`
        <aria-ui-tooltip-root .disabled=${true} data-testid="root">
          <aria-ui-tooltip-trigger .disabled=${true} data-testid="trigger"
            >Trigger</aria-ui-tooltip-trigger
          >
          <aria-ui-tooltip-positioner>
            <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)

      await expect.element(page.getByTestId('root')).toHaveAttribute('aria-disabled', 'true')
      await expect.element(page.getByTestId('trigger')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Placement (multiple tooltips)', () => {
    test('multiple tooltips with open-delay attribute work independently', async () => {
      renderTooltip(html`
        <div style="display: flex; gap: 16px;">
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-top"
              >Top</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="popup-top">Tooltip on top</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-bottom"
              >Bottom</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="popup-bottom"
                >Tooltip on bottom</aria-ui-tooltip-popup
              >
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `)

      const popupTop = page.getByTestId('popup-top')
      const popupBottom = page.getByTestId('popup-bottom')

      // Both hidden initially
      await expect.element(popupTop).not.toBeVisible()
      await expect.element(popupBottom).not.toBeVisible()

      // Hover first trigger — should open
      await page.getByTestId('trigger-top').hover()
      await expect.element(popupTop).toBeVisible()
      await expect.element(popupBottom).not.toBeVisible()
    })

    test('hovering between multiple tooltips works correctly', async () => {
      renderTooltip(html`
        <div style="display: flex; gap: 16px;">
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-a"
              >A</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="popup-a">Tooltip A</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" data-testid="trigger-b"
              >B</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="popup-b">Tooltip B</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `)

      const popupA = page.getByTestId('popup-a')
      const popupB = page.getByTestId('popup-b')

      // Hover A -> open A
      await page.getByTestId('trigger-a').hover()
      await expect.element(popupA).toBeVisible()
      await expect.element(popupB).not.toBeVisible()

      // Move to B -> close A, open B
      await page.getByTestId('trigger-b').hover()
      await expect.element(popupB).toBeVisible()
      await expect.element(popupA).not.toBeVisible()
    })
  })

  describe('innerHTML (elements created via innerHTML on connected container)', () => {
    test('tooltips work when elements are created via innerHTML', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      container.innerHTML = `
        <div style="display: flex; gap: 16px; padding: 50px;">
          <aria-ui-tooltip-root class="inline-block">
            <aria-ui-tooltip-trigger tabindex="0" open-delay="0" data-testid="late-t1">Top</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="late-p1">Tooltip on top</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
          <aria-ui-tooltip-root class="inline-block">
            <aria-ui-tooltip-trigger tabindex="0" open-delay="0" data-testid="late-t2">Bottom</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="late-p2">Tooltip on bottom</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `

      const popup2 = page.getByTestId('late-p2')
      await expect.element(popup2).not.toBeVisible()
      await page.getByTestId('late-t2').hover()
      await expect.element(popup2).toBeVisible()
    })
  })

  describe('Each tooltip opens independently', () => {
    test('second tooltip opens on hover without hovering first tooltip', async () => {
      renderTooltip(html`
        <div style="display: flex; gap: 16px; padding: 50px;">
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t1"
              >Top</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="p1">Tooltip on top</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t2"
              >Bottom</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="p2">Tooltip on bottom</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t3"
              >Left</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="left">
              <aria-ui-tooltip-popup data-testid="p3">Tooltip on left</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t4"
              >Right</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="right">
              <aria-ui-tooltip-popup data-testid="p4">Tooltip on right</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `)

      // Directly hover the second trigger without touching the first
      await page.getByTestId('t2').hover()
      await expect.element(page.getByTestId('p2')).toBeVisible()
    })

    test('third and fourth tooltips open on hover', async () => {
      renderTooltip(html`
        <div style="display: flex; gap: 16px; padding: 50px;">
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t1"
              >Top</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="top">
              <aria-ui-tooltip-popup data-testid="p1">Tooltip on top</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t2"
              >Bottom</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="bottom">
              <aria-ui-tooltip-popup data-testid="p2">Tooltip on bottom</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t3"
              >Left</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="left">
              <aria-ui-tooltip-popup data-testid="p3">Tooltip on left</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger open-delay="0" tabindex="0" data-testid="t4"
              >Right</aria-ui-tooltip-trigger
            >
            <aria-ui-tooltip-positioner placement="right">
              <aria-ui-tooltip-popup data-testid="p4">Tooltip on right</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        </div>
      `)

      // Hover third trigger directly
      await page.getByTestId('t3').hover()
      await expect.element(page.getByTestId('p3')).toBeVisible()

      // Move away then hover fourth (real Playwright hover handles mouseleave)
      await page.getByTestId('t4').hover()
      await expect.element(page.getByTestId('p4')).toBeVisible()
    })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => {
      renderTooltip(html`
        <aria-ui-tooltip-root .open=${true}>
          <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
          <aria-ui-tooltip-positioner data-testid="positioner">
            <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)

      await expect.element(page.getByTestId('positioner')).toHaveStyle({ position: 'absolute' })
    })

    test('positioner respects strategy prop', async () => {
      renderTooltip(html`
        <aria-ui-tooltip-root .open=${true}>
          <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
          <aria-ui-tooltip-positioner .strategy=${'fixed'} data-testid="positioner">
            <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
          </aria-ui-tooltip-positioner>
        </aria-ui-tooltip-root>
      `)

      await expect.element(page.getByTestId('positioner')).toHaveStyle({ position: 'fixed' })
    })
  })
})

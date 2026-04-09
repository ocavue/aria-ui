import { FeatureDetectionInternals } from '@aria-ui/utils'
import { html, render, type TemplateResult } from 'lit-html'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

interface Environment {
  popover: boolean
}

function collectEnvironments() {
  let environments: Environment[] = [
    {
      popover: false,
    },
  ]

  if (FeatureDetectionInternals.Popover.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, popover: true })),
      ...environments.map((env) => ({ ...env, popover: false })),
    ]
  }

  return environments
}

function setupEnvironment(environment: Environment) {
  FeatureDetectionInternals.Popover.override(environment.popover)
}

function teardownEnvironment() {
  FeatureDetectionInternals.Popover.reset()
}

function forEachEnvironment(environments: Environment[], callback: () => void) {
  for (const environment of environments) {
    describe(`Environment popover ${environment.popover}`, () => {
      beforeEach(() => {
        setupEnvironment(environment)
      })

      afterEach(() => {
        teardownEnvironment()
      })

      callback()
    })
  }
}

function renderPopover(template: TemplateResult) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

const POPOVER_TEMPLATE = html`
  <aria-ui-popover-root>
    <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
    <aria-ui-popover-positioner>
      <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
    </aria-ui-popover-positioner>
  </aria-ui-popover-root>
`

function getPopover() {
  return {
    trigger: page.getByTestId('trigger'),
    popup: page.getByTestId('popup'),
  }
}

function runTests() {
  describe('Basic Functionality', () => {
    test('renders popover elements', async () => {
      renderPopover(POPOVER_TEMPLATE)
      const { trigger, popup } = getPopover()
      await expect.element(trigger).toBeInTheDocument()
      await expect.element(popup).toBeInTheDocument()
    })

    test('popup is hidden by default', async () => {
      renderPopover(POPOVER_TEMPLATE)
      const { popup } = getPopover()
      await expect.element(popup).toBeInTheDocument()
      await expect.element(popup).not.toBeVisible()
    })

    test('popup shows with defaultOpen=true', async () => {
      renderPopover(html`
        <aria-ui-popover-root .defaultOpen=${true}>
          <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
          <aria-ui-popover-positioner>
            <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      await expect.element(page.getByTestId('popup')).toBeVisible()
    })
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens and closes popover', async () => {
      renderPopover(POPOVER_TEMPLATE)
      const { trigger, popup } = getPopover()

      await expect.element(trigger).toBeInTheDocument()
      await expect.element(popup).toBeInTheDocument()

      // Initially closed
      await expect.element(popup).not.toBeVisible()

      // Click to open
      await trigger.click()
      await expect.element(popup).toBeVisible()

      // Click to close
      await trigger.click()
      await expect.element(popup).not.toBeVisible()
    })

    test('trigger has correct aria-expanded attribute', async () => {
      renderPopover(POPOVER_TEMPLATE)
      const { trigger } = getPopover()

      // Initially false
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')

      // After click, should be true
      await trigger.click()
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true')

      // After second click, should be false
      await trigger.click()
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    test('disabled trigger does not open popover', async () => {
      renderPopover(html`
        <aria-ui-popover-root>
          <aria-ui-popover-trigger .disabled=${true} data-testid="trigger"
            >Trigger</aria-ui-popover-trigger
          >
          <aria-ui-popover-positioner>
            <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      const { trigger, popup } = getPopover()
      await trigger.click()
      await expect.element(popup).not.toBeVisible()
    })
  })

  describe('Hover Interactions', () => {
    test('hover opens popover when openOnHover is true', async () => {
      renderPopover(html`
        <aria-ui-popover-root>
          <aria-ui-popover-trigger .openOnHover=${true} .delay=${0} data-testid="trigger">
            Trigger
          </aria-ui-popover-trigger>
          <aria-ui-popover-positioner>
            <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      const { trigger, popup } = getPopover()

      // Initially closed
      await expect.element(popup).not.toBeVisible()

      // Hover to open
      await trigger.hover()
      await expect.element(popup).toBeVisible()
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', async () => {
      const container = renderPopover(html`
        <aria-ui-popover-root data-testid="root" .open=${true}>
          <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
          <aria-ui-popover-positioner>
            <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      const popup = page.getByTestId('popup')
      await expect.element(popup).toBeVisible()

      const rootElement = container.querySelector('aria-ui-popover-root')!
      rootElement.open = false
      await expect.element(popup).not.toBeVisible()
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = renderPopover(POPOVER_TEMPLATE)
      const root = container.querySelector('aria-ui-popover-root')!
      const onOpenChange = vi.fn()
      root.addEventListener('openChange', onOpenChange)

      await getPopover().trigger.click()
      expect(onOpenChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    test('popup has role dialog', async () => {
      renderPopover(POPOVER_TEMPLATE)
      await expect.element(page.getByTestId('popup')).toHaveAttribute('role', 'dialog')
    })

    test('disabled elements have aria-disabled', async () => {
      renderPopover(html`
        <aria-ui-popover-root .disabled=${true} data-testid="root">
          <aria-ui-popover-trigger .disabled=${true} data-testid="trigger"
            >Trigger</aria-ui-popover-trigger
          >
          <aria-ui-popover-positioner>
            <aria-ui-popover-popup>Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      await expect.element(page.getByTestId('root')).toHaveAttribute('aria-disabled', 'true')
      await expect.element(page.getByTestId('trigger')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => {
      renderPopover(html`
        <aria-ui-popover-root .open=${true}>
          <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
          <aria-ui-popover-positioner data-testid="positioner">
            <aria-ui-popover-popup>Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      await expect.element(page.getByTestId('positioner')).toHaveStyle({ position: 'absolute' })
    })

    test('positioner respects strategy prop', async () => {
      renderPopover(html`
        <aria-ui-popover-root .open=${true}>
          <aria-ui-popover-trigger>Trigger</aria-ui-popover-trigger>
          <aria-ui-popover-positioner .strategy=${'fixed'} data-testid="positioner">
            <aria-ui-popover-popup>Content</aria-ui-popover-popup>
          </aria-ui-popover-positioner>
        </aria-ui-popover-root>
      `)

      await expect.element(page.getByTestId('positioner')).toHaveStyle({ position: 'fixed' })
    })
  })
}

describe('Popover', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  const environments = collectEnvironments()
  forEachEnvironment(environments, runTests)
})

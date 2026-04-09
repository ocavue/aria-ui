import { html, render, type TemplateResult } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page, type Locator } from 'vitest/browser'

import { registerElements } from '../index.ts'

function renderListbox(template: TemplateResult) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

// The listbox keydown listener is attached to the root element directly,
// not to document. Dispatching the event on the root locator is the most
// reliable way to drive keyboard navigation in tests.
function pressKey(root: Locator, key: string) {
  root
    .element()
    .dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
}

describe('Listbox', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders listbox elements', async () => {
      renderListbox(html`
        <aria-ui-listbox-root>
          <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByText('Apple')).toBeInTheDocument()
      await expect.element(page.getByText('Banana')).toBeInTheDocument()
    })

    test('root has role listbox', async () => {
      renderListbox(html`
        <aria-ui-listbox-root data-testid="root">
          <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('root')).toHaveAttribute('role', 'listbox')
    })

    test('items have role option', async () => {
      renderListbox(html`
        <aria-ui-listbox-root>
          <aria-ui-listbox-item value="apple" data-testid="item">Apple</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('item')).toHaveAttribute('role', 'option')
    })
  })

  describe('Selection (single)', () => {
    test('clicking an item selects it', async () => {
      renderListbox(html`
        <aria-ui-listbox-root>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await page.getByTestId('apple').click()
      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      await expect.element(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'false')
    })

    test('value prop sets initial selection', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .value=${'banana'}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
      await expect.element(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Selection (multiple)', () => {
    test('multiple items can be selected', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .multiple=${true}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await page.getByTestId('apple').click()
      await page.getByTestId('banana').click()
      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      await expect.element(page.getByTestId('banana')).toHaveAttribute('aria-selected', 'true')
    })

    test('clicking selected item deselects it in multi-select', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .multiple=${true} .values=${['apple']}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
      await page.getByTestId('apple').click()
      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
    })

    test('root has aria-multiselectable', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .multiple=${true} data-testid="root">
          <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('root')).toHaveAttribute('aria-multiselectable', 'true')
    })
  })

  describe('Keyboard Navigation', () => {
    test('focus sets active to first item, arrow down moves to second', async () => {
      renderListbox(html`
        <aria-ui-listbox-root data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      const root = page.getByTestId('root')
      await root.click()
      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')

      pressKey(root, 'ArrowDown')
      await expect.element(page.getByTestId('banana')).toHaveAttribute('data-highlighted', '')
    })

    test('arrow down twice moves to third item', async () => {
      renderListbox(html`
        <aria-ui-listbox-root data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      const root = page.getByTestId('root')
      await root.click()
      pressKey(root, 'ArrowDown')
      pressKey(root, 'ArrowDown')

      await expect.element(page.getByTestId('cherry')).toHaveAttribute('data-highlighted', '')
    })

    test('Home key moves to first item', async () => {
      renderListbox(html`
        <aria-ui-listbox-root data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
          <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      const root = page.getByTestId('root')
      await root.click()
      pressKey(root, 'End')
      pressKey(root, 'Home')

      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')
    })

    test('Enter key selects active item in multi-select mode', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .multiple=${true} data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      const root = page.getByTestId('root')
      await root.click()
      pressKey(root, 'ArrowDown')
      pressKey(root, 'Enter')

      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'true')
    })

    test('skips disabled items', async () => {
      renderListbox(html`
        <aria-ui-listbox-root data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" .disabled=${true} data-testid="banana"
            >Banana</aria-ui-listbox-item
          >
          <aria-ui-listbox-item value="cherry" data-testid="cherry">Cherry</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      // Focus sets active to apple, then ArrowDown skips banana (disabled) → cherry
      const root = page.getByTestId('root')
      await root.click()
      pressKey(root, 'ArrowDown')

      await expect.element(page.getByTestId('cherry')).toHaveAttribute('data-highlighted', '')
    })
  })

  describe('Filtering', () => {
    test('query filters visible items', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .query=${'ban'}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).not.toBeVisible()
      await expect.element(page.getByTestId('banana')).toBeVisible()
    })

    test('empty component shows when all items are filtered out', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .query=${'xyz'}>
          <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-empty data-testid="empty">No results</aria-ui-listbox-empty>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('empty')).toBeVisible()
    })

    test('empty component is hidden when items match', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .query=${''}>
          <aria-ui-listbox-item value="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-empty data-testid="empty">No results</aria-ui-listbox-empty>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('empty')).not.toBeVisible()
    })
  })

  describe('Disabled', () => {
    test('disabled root has aria-disabled', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .disabled=${true} data-testid="root">
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('root')).toHaveAttribute('aria-disabled', 'true')
    })

    test('disabled item has aria-disabled', async () => {
      renderListbox(html`
        <aria-ui-listbox-root>
          <aria-ui-listbox-item value="apple" .disabled=${true} data-testid="apple"
            >Apple</aria-ui-listbox-item
          >
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-disabled', 'true')
    })

    test('clicking disabled item does not select', async () => {
      renderListbox(html`
        <aria-ui-listbox-root>
          <aria-ui-listbox-item value="apple" .disabled=${true} data-testid="apple"
            >Apple</aria-ui-listbox-item
          >
        </aria-ui-listbox-root>
      `)

      // Playwright's locator.click() refuses disabled elements; dispatch is
      // exactly what this test exercises (a synthetic click is a no-op).
      page
        .getByTestId('apple')
        .element()
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await expect.element(page.getByTestId('apple')).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('autoHighlight', () => {
    test('autoHighlight sets active to first item on mount', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .autoHighlight=${true}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')
    })

    test('no item is highlighted on mount when autoHighlight is false, and toggling it on highlights the first item', async () => {
      const container = renderListbox(html`
        <aria-ui-listbox-root .autoHighlight=${false}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).not.toHaveAttribute('data-highlighted')
      await expect.element(page.getByTestId('banana')).not.toHaveAttribute('data-highlighted')

      const root = container.querySelector('aria-ui-listbox-root') as HTMLElement & {
        autoHighlight: boolean
      }
      root.autoHighlight = true

      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')
      await expect.element(page.getByTestId('banana')).not.toHaveAttribute('data-highlighted')
    })

    test('autoHighlight=true is suppressed while disabled', async () => {
      renderListbox(html`
        <aria-ui-listbox-root .autoHighlight=${true} .disabled=${true}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      await expect.element(page.getByTestId('apple')).not.toHaveAttribute('data-highlighted')
      await expect.element(page.getByTestId('banana')).not.toHaveAttribute('data-highlighted')
    })
  })

  describe('disabled', () => {
    test('toggling disabled clears and restores the highlighted item', async () => {
      const container = renderListbox(html`
        <aria-ui-listbox-root .autoHighlight=${true}>
          <aria-ui-listbox-item value="apple" data-testid="apple">Apple</aria-ui-listbox-item>
          <aria-ui-listbox-item value="banana" data-testid="banana">Banana</aria-ui-listbox-item>
        </aria-ui-listbox-root>
      `)

      // The first item is auto-highlighted on mount.
      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')

      const root = container.querySelector('aria-ui-listbox-root') as HTMLElement & {
        disabled: boolean
      }

      // Disabling clears the highlight.
      root.disabled = true
      await expect.element(page.getByTestId('apple')).not.toHaveAttribute('data-highlighted')
      await expect.element(page.getByTestId('banana')).not.toHaveAttribute('data-highlighted')

      // Re-enabling restores the auto-highlight on the first item.
      root.disabled = false
      await expect.element(page.getByTestId('apple')).toHaveAttribute('data-highlighted', '')
    })
  })
})

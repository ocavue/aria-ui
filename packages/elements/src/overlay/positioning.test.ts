import { html, render, type TemplateResult } from 'lit-html'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

function renderTemplate(template: TemplateResult) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render(template, container)
  return container
}

function getPositioner(): HTMLElement {
  const positioner = document.querySelector('aria-ui-popover-positioner')
  if (!positioner) throw new Error('positioner not found')
  return positioner
}

function getComputedTranslate(element: HTMLElement): { x: number; y: number } {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform)
  return { x: matrix.m41, y: matrix.m42 }
}

function getInlineTranslate(element: HTMLElement): { x: number; y: number } {
  const matrix = new DOMMatrixReadOnly(element.style.transform)
  return { x: matrix.m41, y: matrix.m42 }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TEMPLATE = html`
  <div data-testid="spacer" style="height: 100px"></div>
  <div data-testid="wrapper" style="padding: 50px">
    <aria-ui-popover-root .open=${true}>
      <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
      <aria-ui-popover-positioner>
        <aria-ui-popover-popup data-testid="popup">Content</aria-ui-popover-popup>
      </aria-ui-popover-positioner>
    </aria-ui-popover-root>
  </div>
`

describe('overlay positioning with a hidden anchor', () => {
  let transitionStyle: HTMLStyleElement | undefined

  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  afterEach(() => {
    transitionStyle?.remove()
    transitionStyle = undefined
  })

  function installSlowTransformTransition() {
    transitionStyle = document.createElement('style')
    transitionStyle.textContent =
      'aria-ui-popover-positioner { transition: transform 10000s linear; }'
    document.head.appendChild(transitionStyle)
  }

  test('keeps the last position while the anchor is not rendered', async () => {
    const container = renderTemplate(TEMPLATE)
    await expect.element(page.getByTestId('popup')).toBeVisible()

    const positioner = getPositioner()
    await expect.poll(() => positioner.style.transform).toMatch(/translate\(/)
    const openTransform = positioner.style.transform

    // Hide the whole subtree; the trigger's rect collapses to a zero rect at
    // the viewport origin. Positioning against it would park the positioner
    // near the origin.
    const wrapper = container.querySelector<HTMLElement>('[data-testid="wrapper"]')
    if (!wrapper) throw new Error('wrapper not found')
    wrapper.style.display = 'none'
    // Give autoUpdate's ResizeObserver time to react to the hidden elements.
    await sleep(200)
    expect(positioner.style.transform).toBe(openTransform)

    wrapper.style.display = ''
    await expect.poll(() => positioner.style.transform).toBe(openTransform)
  })

  test('repositions without transition after the anchor is rendered again', async () => {
    installSlowTransformTransition()

    const container = renderTemplate(TEMPLATE)
    await expect.element(page.getByTestId('popup')).toBeVisible()

    const positioner = getPositioner()
    await expect.poll(() => positioner.style.transform).toMatch(/translate\(/)
    const openTransform = positioner.style.transform

    const wrapper = container.querySelector<HTMLElement>('[data-testid="wrapper"]')
    const spacer = container.querySelector<HTMLElement>('[data-testid="spacer"]')
    if (!wrapper || !spacer) throw new Error('wrapper or spacer not found')

    // Move the anchor while it is not rendered, so the positioner must jump
    // to a different position when the anchor shows up again.
    wrapper.style.display = 'none'
    await sleep(200)
    spacer.style.height = '400px'
    wrapper.style.display = ''

    await expect.poll(() => positioner.style.transform).not.toBe(openTransform)

    // The new position must be applied without animating from the old one:
    // with the slow transform transition above, an animated move would keep
    // the computed transform near the old position for hours.
    await expect
      .poll(() => {
        const computed = getComputedTranslate(positioner)
        const target = getInlineTranslate(positioner)
        return Math.abs(computed.x - target.x) < 0.5 && Math.abs(computed.y - target.y) < 0.5
      })
      .toBe(true)
  })
})

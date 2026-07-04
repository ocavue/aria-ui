import { beforeEach, describe, expect, test } from 'vitest'

import { isElementHidden } from './is-element-hidden.ts'

describe('isElementHidden', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  function appendDiv(parent: Element, style: string): HTMLElement {
    const div = document.createElement('div')
    div.setAttribute('style', style)
    parent.appendChild(div)
    return div
  }

  test('returns false for undefined', () => {
    expect(isElementHidden(undefined)).toBe(false)
  })

  test('returns false for a rendered element', () => {
    const div = appendDiv(document.body, '')
    expect(isElementHidden(div)).toBe(false)
  })

  test('returns true for a display: none element', () => {
    const div = appendDiv(document.body, 'display: none')
    expect(isElementHidden(div)).toBe(true)
  })

  test('returns true inside a display: none ancestor', () => {
    const parent = appendDiv(document.body, 'display: none')
    const child = appendDiv(parent, '')
    expect(isElementHidden(child)).toBe(true)
  })

  test('returns false for a rendered display: contents element', () => {
    const div = appendDiv(document.body, 'display: contents')
    expect(isElementHidden(div)).toBe(false)
  })

  test('returns false for nested rendered display: contents elements', () => {
    const parent = appendDiv(document.body, 'display: contents')
    const child = appendDiv(parent, 'display: contents')
    expect(isElementHidden(child)).toBe(false)
  })

  test('returns true for a display: contents element inside a display: none ancestor', () => {
    const parent = appendDiv(document.body, 'display: none')
    const child = appendDiv(parent, 'display: contents')
    expect(isElementHidden(child)).toBe(true)
  })
})

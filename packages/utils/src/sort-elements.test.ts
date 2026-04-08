import { describe, expect, test } from 'vitest'

import { sortElements } from './sort-elements.ts'

describe('sortElements', () => {
  test('sorts elements in document order', () => {
    const container = document.createElement('div')
    const a = document.createElement('span')
    const b = document.createElement('span')
    const c = document.createElement('span')
    container.append(a, b, c)
    document.body.appendChild(container)

    expect(sortElements([c, a, b])).toEqual([a, b, c])

    document.body.removeChild(container)
  })

  test('sorts nested elements in document order', () => {
    const container = document.createElement('div')
    const parent = document.createElement('div')
    const child = document.createElement('span')
    parent.appendChild(child)
    container.append(parent, document.createElement('p'))
    document.body.appendChild(container)

    const p = container.querySelector('p')!
    expect(sortElements([p, child, parent])).toEqual([parent, child, p])

    document.body.removeChild(container)
  })

  test('returns empty array for empty input', () => {
    expect(sortElements([])).toEqual([])
  })

  test('returns single element as-is', () => {
    const el = document.createElement('div')
    expect(sortElements([el])).toEqual([el])
  })

  test('accepts any iterable', () => {
    const container = document.createElement('div')
    const a = document.createElement('span')
    const b = document.createElement('span')
    container.append(a, b)
    document.body.appendChild(container)

    const set = new Set([b, a])
    expect(sortElements(set)).toEqual([a, b])

    document.body.removeChild(container)
  })
})

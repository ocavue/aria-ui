import { describe, expect, it } from 'vitest'

import { defaultItemFilter } from './listbox-root.ts'

function matches(value: string, query: string): boolean {
  return defaultItemFilter({ value, query })
}

describe('defaultItemFilter', () => {
  it('shows every item when the query is empty', () => {
    expect(matches('Apple', '')).toBe(true)
  })

  it('shows every item when the query is only whitespace or punctuation', () => {
    expect(matches('Apple', '   ')).toBe(true)
    expect(matches('Apple', '#')).toBe(true)
    expect(matches('Apple', '@/.')).toBe(true)
  })

  it('matches case-insensitively', () => {
    expect(matches('Banana', 'ban')).toBe(true)
    expect(matches('banana', 'BAN')).toBe(true)
  })

  it('matches a substring anywhere in the value', () => {
    expect(matches('banana', 'nan')).toBe(true)
    expect(matches('pineapple', 'apple')).toBe(true)
  })

  it('does not match when the query is absent from the value', () => {
    expect(matches('apple', 'xyz')).toBe(false)
    expect(matches('', 'apple')).toBe(false)
  })

  it('ignores punctuation in the query', () => {
    expect(matches('banana', '#ban')).toBe(true)
    expect(matches('banana', 'b.a.n')).toBe(true)
  })

  it('ignores punctuation in the value', () => {
    expect(matches('#banana', 'ban')).toBe(true)
    expect(matches('c-h-e-r-r-y', 'cherry')).toBe(true)
  })

  it('ignores whitespace on both sides', () => {
    expect(matches('Banana Split', 'bananasplit')).toBe(true)
    expect(matches('bananasplit', 'banana split')).toBe(true)
  })

  it('drops punctuation entirely, so it never blocks a match', () => {
    // `c++` normalizes to `c`, which matches the value `c`.
    expect(matches('c', 'c++')).toBe(true)
  })

  it('keeps letters and numbers from every script', () => {
    expect(matches('日本語', '日本')).toBe(true)
    expect(matches('【日本語】', '日本')).toBe(true)
    expect(matches('Café', 'café')).toBe(true)
    expect(matches('item42', '42')).toBe(true)
  })
})

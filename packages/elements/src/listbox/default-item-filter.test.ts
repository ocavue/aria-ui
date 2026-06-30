import { describe, expect, it } from 'vitest'

import { defaultItemFilter } from './listbox-root.ts'

describe('defaultItemFilter', () => {
  it('shows every item when the query is empty', () => {
    expect(defaultItemFilter({ value: 'Apple', query: '' })).toBe(true)
  })

  it('shows every item when the query is only whitespace or punctuation', () => {
    expect(defaultItemFilter({ value: 'Apple', query: '   ' })).toBe(true)
    expect(defaultItemFilter({ value: 'Apple', query: '#' })).toBe(true)
    expect(defaultItemFilter({ value: 'Apple', query: '@/.' })).toBe(true)
  })

  it('matches case-insensitively', () => {
    expect(defaultItemFilter({ value: 'Banana', query: 'ban' })).toBe(true)
    expect(defaultItemFilter({ value: 'banana', query: 'BAN' })).toBe(true)
  })

  it('matches a substring anywhere in the value', () => {
    expect(defaultItemFilter({ value: 'banana', query: 'nan' })).toBe(true)
    expect(defaultItemFilter({ value: 'pineapple', query: 'apple' })).toBe(true)
  })

  it('does not match when the query is absent from the value', () => {
    expect(defaultItemFilter({ value: 'apple', query: 'xyz' })).toBe(false)
    expect(defaultItemFilter({ value: '', query: 'apple' })).toBe(false)
  })

  it('ignores punctuation in the query', () => {
    expect(defaultItemFilter({ value: 'banana', query: '#ban' })).toBe(true)
    expect(defaultItemFilter({ value: 'banana', query: 'b.a.n' })).toBe(true)
  })

  it('ignores punctuation in the value', () => {
    expect(defaultItemFilter({ value: '#banana', query: 'ban' })).toBe(true)
    expect(defaultItemFilter({ value: 'c-h-e-r-r-y', query: 'cherry' })).toBe(true)
  })

  it('ignores whitespace on both sides', () => {
    expect(defaultItemFilter({ value: 'Banana Split', query: 'bananasplit' })).toBe(true)
    expect(defaultItemFilter({ value: 'bananasplit', query: 'banana split' })).toBe(true)
  })

  it('drops punctuation entirely, so it never blocks a match', () => {
    // `c++` normalizes to `c`, which matches the value `c`.
    expect(defaultItemFilter({ value: 'c', query: 'c++' })).toBe(true)
  })

  it('keeps letters and numbers from every script', () => {
    expect(defaultItemFilter({ value: '日本語', query: '日本' })).toBe(true)
    expect(defaultItemFilter({ value: '【日本語】', query: '日本' })).toBe(true)
    expect(defaultItemFilter({ value: 'Café', query: 'café' })).toBe(true)
    expect(defaultItemFilter({ value: 'item42', query: '42' })).toBe(true)
  })
})

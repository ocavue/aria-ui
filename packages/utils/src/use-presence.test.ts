import { createSignal, defineCustomElement, defineProps, type HostElement } from '@aria-ui/core'
import { getId, sleep } from '@ocavue/utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { usePresence } from './use-presence.ts'

describe('usePresence', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  function createTestElement(setupFn: (host: HostElement) => void) {
    const TestElement = defineCustomElement(setupFn, defineProps({}))
    const tagName = `test-presence-${getId()}`
    customElements.define(tagName, TestElement)
    const element = document.createElement(tagName) as HostElement
    document.body.appendChild(element)
    return element
  }

  test('shows element when open is true', () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    expect(element.style.display).not.toBe('none')
  })

  test('hides element when open is false', () => {
    const open = createSignal(false)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    expect(element.style.display).toBe('none')
  })

  test('shows element when open changes from false to true', () => {
    const open = createSignal(false)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    expect(element.style.display).toBe('none')

    open.set(true)
    expect(element.style.display).not.toBe('none')
  })

  test('hides without waiting when no animations', async () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    vi.spyOn(element, 'getAnimations').mockReturnValue([])

    open.set(false)
    await sleep(0)
    expect(element.style.display).toBe('none')
  })

  test('waits for animations before hiding', async () => {
    const open = createSignal(true)

    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    let resolveAnimation: () => void
    const finishedPromise = new Promise<void>((resolve) => {
      resolveAnimation = resolve
    })

    vi.spyOn(element, 'getAnimations').mockReturnValue([
      { finished: finishedPromise } as unknown as Animation,
    ])

    expect(element.style.display).not.toBe('none')
    open.set(false)

    // Should still be visible while animation is running
    await sleep(0)
    await sleep(0)
    await sleep(0)
    expect(element.style.display).not.toBe('none')

    // Resolve the animation
    resolveAnimation!()
    await finishedPromise
    await sleep(0)

    expect(element.style.display).toBe('none')
  })

  test('cancels pending hide when reopened', async () => {
    const open = createSignal(true)

    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })

    let resolveAnimation: () => void
    const finishedPromise = new Promise<void>((resolve) => {
      resolveAnimation = resolve
    })

    vi.spyOn(element, 'getAnimations').mockReturnValue([
      { finished: finishedPromise } as unknown as Animation,
    ])

    // Close - starts waiting for animation
    open.set(false)
    expect(element.style.display).not.toBe('none')

    // Reopen before animation finishes
    open.set(true)

    // Now finish the animation
    resolveAnimation!()
    await finishedPromise
    await sleep(0)

    // Should still be visible because we reopened
    expect(element.style.display).not.toBe('none')
  })

  test('returns a readable visible getter', () => {
    const open = createSignal(false)
    let getVisible: () => boolean

    createTestElement((host) => {
      getVisible = usePresence(host, open.get)
    })

    expect(getVisible!()).toBe(false)

    open.set(true)
    expect(getVisible!()).toBe(true)
  })

  test('calls onComplete with false after hiding', async () => {
    const open = createSignal(true)
    const calls: Array<[boolean, string]> = []
    const element = createTestElement((host) => {
      usePresence(host, open.get, {
        onComplete: (value) => {
          calls.push([value, host.style.display])
        },
      })
    })

    let resolveAnimation: () => void
    const finishedPromise = new Promise<void>((resolve) => {
      resolveAnimation = resolve
    })
    vi.spyOn(element, 'getAnimations').mockReturnValue([
      { finished: finishedPromise } as unknown as Animation,
    ])

    open.set(false)
    await sleep(0)
    expect(calls).toEqual([])

    resolveAnimation!()
    await finishedPromise
    await sleep(0)
    expect(calls).toEqual([[false, 'none']])
  })

  test('calls onComplete with true after opening', async () => {
    const open = createSignal(false)
    const onComplete = vi.fn()
    createTestElement((host) => {
      usePresence(host, open.get, { onComplete })
    })

    open.set(true)
    await vi.waitFor(() => expect(onComplete.mock.calls).toEqual([[true]]))
  })

  test('does not call onComplete for the initial state', async () => {
    const onComplete = vi.fn()
    createTestElement((host) => {
      usePresence(host, () => true, { onComplete })
    })
    createTestElement((host) => {
      usePresence(host, () => false, { onComplete })
    })

    await sleep(50)
    expect(onComplete).not.toHaveBeenCalled()
  })

  test('ignores infinite animations', async () => {
    const open = createSignal(true)
    const onComplete = vi.fn()
    const element = createTestElement((host) => {
      usePresence(host, open.get, { onComplete })
    })

    vi.spyOn(element, 'getAnimations').mockReturnValue([
      {
        finished: new Promise(() => {}),
        effect: { getTiming: () => ({ iterations: Infinity }) },
      } as unknown as Animation,
    ])

    open.set(false)
    await sleep(0)
    expect(element.style.display).toBe('none')
    expect(onComplete.mock.calls).toEqual([[false]])
  })
})

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

  // A real animation on the host that runs until the test finishes or cancels it.
  function fade(element: HTMLElement, options?: KeyframeAnimationOptions): Animation {
    return element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 10_000, ...options })
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

    open.set(false)
    await sleep(0)
    expect(element.style.display).toBe('none')
  })

  test('waits for animations before hiding', async () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })
    const animation = fade(element)

    open.set(false)
    await sleep(0)
    await sleep(0)
    await sleep(0)
    expect(element.style.display).not.toBe('none')

    animation.finish()
    await animation.finished
    await sleep(0)
    expect(element.style.display).toBe('none')
  })

  test('cancels pending hide when reopened', async () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })
    const animation = fade(element)

    open.set(false)
    expect(element.style.display).not.toBe('none')

    open.set(true)
    animation.finish()
    await animation.finished
    await sleep(0)
    expect(element.style.display).not.toBe('none')
  })

  test('waits for an animation that replaces a canceled one', async () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })
    const first = fade(element)

    open.set(false)
    await sleep(0)
    first.cancel()
    const second = fade(element)
    await sleep(0)
    await sleep(0)
    expect(element.style.display).not.toBe('none')

    second.finish()
    await second.finished
    await sleep(0)
    expect(element.style.display).toBe('none')
  })

  test('ignores infinite animations', async () => {
    const open = createSignal(true)
    const onComplete = vi.fn()
    const element = createTestElement((host) => {
      usePresence(host, open.get, { onComplete })
    })
    fade(element, { duration: 1000, iterations: Infinity })

    open.set(false)
    await sleep(0)
    expect(element.style.display).toBe('none')
    expect(onComplete.mock.calls).toEqual([[false]])
  })

  test('ignores paused animations', async () => {
    const open = createSignal(true)
    const element = createTestElement((host) => {
      usePresence(host, open.get)
    })
    fade(element).pause()

    open.set(false)
    await sleep(0)
    expect(element.style.display).toBe('none')
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
    const animation = fade(element)

    open.set(false)
    await sleep(0)
    expect(calls).toEqual([])

    animation.finish()
    await animation.finished
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
})

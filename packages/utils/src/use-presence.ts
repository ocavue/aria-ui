import type { HostElement } from '@aria-ui/core'
import { createSignal, useEffect } from '@aria-ui/core'

/**
 * @internal
 */
export interface UsePresenceOptions {
  /**
   * Called after the element finishes showing or hiding: with `true` once the
   * animations started by opening finish, and with `false` once the element is
   * hidden. Not called for the initial state.
   */
  onComplete?: (open: boolean) => void
}

/**
 * Manages element visibility with CSS animation awareness.
 *
 * When `open` becomes `true`, the element is shown immediately. When `open`
 * becomes `false`, the element is hidden after any running CSS animations
 * complete, enabling exit animations.
 *
 * @internal
 */
export function usePresence(
  host: HostElement,
  getOpen: () => boolean,
  options?: UsePresenceOptions,
): () => boolean {
  const visible = createSignal(getOpen())
  let initialized = false

  useEffect(host, () => {
    if (visible.get()) {
      show(host)
    } else {
      hide(host)
    }
  })

  useEffect(host, () => {
    const open = getOpen()
    const initial = !initialized
    initialized = true
    const onComplete = initial ? undefined : options?.onComplete

    if (open) {
      visible.set(true)
      if (!onComplete) return

      let canceled = false
      // Wait one frame so that animations started by the new styles (for
      // example `@starting-style`) are registered.
      const frame = requestAnimationFrame(() => {
        whenAnimationsFinish(
          host,
          () => canceled,
          () => onComplete(true),
        )
      })
      return () => {
        canceled = true
        cancelAnimationFrame(frame)
      }
    }

    let canceled = false
    whenAnimationsFinish(
      host,
      () => canceled,
      () => {
        visible.set(false)
        onComplete?.(false)
      },
    )
    return () => {
      canceled = true
    }
  })

  return visible.get
}

/**
 * Runs `callback` once the element's finite animations finish, synchronously
 * when there are none. Waits again when a finished or canceled animation was
 * replaced by a running one.
 */
function whenAnimationsFinish(
  element: HTMLElement,
  isCanceled: () => boolean,
  callback: VoidFunction,
): void {
  const animations = getFiniteAnimations(element)
  if (animations.length === 0) {
    callback()
    return
  }

  void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
    if (isCanceled()) return
    const running = getFiniteAnimations(element).some(
      (animation) => animation.pending || animation.playState === 'running',
    )
    if (running) {
      whenAnimationsFinish(element, isCanceled, callback)
      return
    }
    callback()
  })
}

/**
 * Infinite animations never finish, so they are ignored.
 */
function getFiniteAnimations(element: HTMLElement): Animation[] {
  return element.getAnimations().filter((animation) => {
    const timing = animation.effect?.getTiming()
    return timing?.duration !== Infinity && timing?.iterations !== Infinity
  })
}

function show(element: HTMLElement): void {
  if (element.style.display === 'none') {
    element.style.display = ''
  }
}

function hide(element: HTMLElement): void {
  element.style.display = 'none'
}

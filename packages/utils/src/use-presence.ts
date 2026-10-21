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
    const controller = new AbortController()
    const { signal } = controller

    if (open) {
      visible.set(true)
      if (onComplete) {
        // Wait one frame so that animations started by the new styles (for
        // example `@starting-style`) are registered.
        const frame = requestAnimationFrame(() => {
          void waitForAnimations(host, signal).then(() => {
            if (!signal.aborted) onComplete(true)
          })
        })
        signal.addEventListener('abort', () => cancelAnimationFrame(frame))
      }
    } else {
      void waitForAnimations(host, signal).then(() => {
        if (signal.aborted) return
        visible.set(false)
        onComplete?.(false)
      })
    }

    return () => controller.abort()
  })

  return visible.get
}

/**
 * Resolves once the element has no animation that is still on its way to the
 * end. Checks again after every wait, since a canceled animation can be
 * replaced by a new one.
 */
async function waitForAnimations(element: HTMLElement, signal: AbortSignal): Promise<void> {
  while (!signal.aborted) {
    const animations = element.getAnimations().filter(isFinishing)
    if (animations.length === 0) return
    await Promise.allSettled(animations.map((animation) => animation.finished))
  }
}

/**
 * Whether the animation is running and will reach its end. Paused and
 * infinite animations never resolve `finished`.
 */
function isFinishing(animation: Animation): boolean {
  return (
    animation.playState === 'running' && animation.effect?.getComputedTiming().endTime !== Infinity
  )
}

function show(element: HTMLElement): void {
  if (element.style.display === 'none') {
    element.style.display = ''
  }
}

function hide(element: HTMLElement): void {
  element.style.display = 'none'
}

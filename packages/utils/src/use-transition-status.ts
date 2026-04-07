import { createSignal, useEffect, type HostElement } from '@aria-ui/core'

/** @internal */
export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited'

/** @internal */
export function useTransitionStatus(
  host: HostElement,
  getOpen: () => boolean,
): () => TransitionStatus {
  const status = createSignal<TransitionStatus>('exited')
  let mounted = false

  useEffect(host, () => {
    const open = getOpen()
    if (open) {
      status.set('entering')
      mounted = true
      const id = requestAnimationFrame(() => {
        status.set('entered')
      })
      return () => cancelAnimationFrame(id)
    } else if (mounted) {
      status.set('exiting')
      const id = requestAnimationFrame(() => {
        status.set('exited')
      })
      return () => cancelAnimationFrame(id)
    }
  })

  return status.get
}

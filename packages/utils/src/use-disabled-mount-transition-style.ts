import type { HostElement } from '@aria-ui/core'
import { useEffect } from '@aria-ui/core'

import type { TransitionStatus } from './use-transition-status'

/** @internal */
export function useDisabledMountTransitionStyle(
  host: HostElement,
  getTransitionStatus: () => TransitionStatus,
): void {
  let currentValue: string = ''

  const update = (newValue: string) => {
    if (currentValue !== newValue) {
      currentValue = newValue
      host.style.transition = newValue
    }
  }

  useEffect(host, () => {
    const status = getTransitionStatus()
    if (status === 'entering') {
      // Disable CSS transitions during the initial mount, so that the element
      // can transition from its initial styles to the "entering" styles without
      // animating.
      update('none')
    } else {
      update('')
    }
  })
}

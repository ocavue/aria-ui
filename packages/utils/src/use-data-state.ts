import type { HostElement } from '@aria-ui/core'
import { computed, useEffect } from '@aria-ui/core'

export function useDataState(host: HostElement, getOpen: () => boolean) {
  const getDataState = computed(() => (getOpen() ? 'open' : 'closed'))
  useEffect(host, () => {
    host.dataset.state = getDataState()
  })
}

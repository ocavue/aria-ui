import type { HostElement, PropsDeclaration } from '@aria-ui/core'
import { computed, defineProps, type State } from '@aria-ui/core'
import { useAriaDisabled } from '@aria-ui/utils'

import type { OpenChangeEvent } from './open-change-event.ts'
import type { OverlayStore } from './overlay-store.ts'
import { createOverlayStore } from './overlay-store.ts'

export interface OverlayRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open: boolean | null

  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const OverlayRootPropsDeclaration: PropsDeclaration<OverlayRootProps> =
  defineProps<OverlayRootProps>({
    defaultOpen: {
      default: false,
      attribute: 'default-open',
      type: 'boolean',
    },
    open: {
      default: null,
      attribute: 'open',
      type: 'json',
    },
    disabled: {
      default: false,
      attribute: 'disabled',
      type: 'boolean',
    },
  })

/**
 * @internal
 */
export function useOverlayStore(host: HostElement, props: State<OverlayRootProps>): OverlayStore {
  const getDisabled = computed(() => props.disabled.get())

  const dispatchOpenChangeEvent = (event: OpenChangeEvent) => {
    host.dispatchEvent(event)
  }

  const store = createOverlayStore(
    props.open.get,
    props.open.set,
    props.defaultOpen.get,
    getDisabled,
    dispatchOpenChangeEvent,
  )

  useAriaDisabled(host, getDisabled)

  return store
}

import type { HostElement } from '@aria-ui/core'
import { defineCustomElement, defineProps, registerCustomElement, type State } from '@aria-ui/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import {
  OverlayRootPropsDeclaration,
  useOverlayStore,
  type OverlayRootProps,
} from '../overlay/overlay-root.ts'

import { PopoverStoreContext } from './popover-store.ts'

export { OpenChangeEvent }

export interface PopoverRootProps extends OverlayRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal: boolean
}

/**
 * @internal
 */
export const PopoverRootPropsDeclaration = defineProps<PopoverRootProps>({
  ...OverlayRootPropsDeclaration,
  modal: {
    default: false,
    attribute: 'modal',
    type: 'boolean',
  },
})

export interface PopoverRootEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupPopoverRoot(host: HostElement, props: State<PopoverRootProps>) {
  const store = useOverlayStore(host, props)
  PopoverStoreContext.provide(host, store)
}

/**
 * `<aria-ui-popover-root>` custom element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * Events: {@link PopoverRootEvents}
 */
export class PopoverRootElement extends defineCustomElement(
  setupPopoverRoot,
  PopoverRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverRootElement(): void {
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}

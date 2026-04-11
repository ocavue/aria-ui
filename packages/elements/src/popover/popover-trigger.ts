import type { HostElement } from '@aria-ui/core'
import {
  computed,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'
import {
  useAriaControls,
  useAriaDisabled,
  useAriaExpanded,
  useHover,
  usePress,
} from '@aria-ui/utils'

import type { OpenChangeEvent } from './popover-root.ts'
import { PopoverStoreContext } from './popover-store.ts'

export interface PopoverTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean

  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover: boolean

  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay: number

  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay: number
}

/**
 * @internal
 */
export const PopoverTriggerPropsDeclaration =
  /* @__PURE__ */ defineProps<PopoverTriggerProps>({
    disabled: {
      default: false,
      attribute: 'disabled',
      type: 'boolean',
    },
    openOnHover: {
      default: false,
      attribute: 'open-on-hover',
      type: 'boolean',
    },
    delay: {
      default: 300,
      attribute: 'delay',
      type: 'number',
    },
    closeDelay: {
      default: 0,
      attribute: 'close-delay',
      type: 'number',
    },
  })

export interface PopoverTriggerEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupPopoverTrigger(host: HostElement, props: State<PopoverTriggerProps>) {
  const getDisabled = props.disabled.get
  const getStore = PopoverStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getIsOpen())
  const getPopupId = computed(() => getStore()?.getPopupId())

  usePress(host, () => {
    if (getDisabled()) return
    getStore()?.requestOpenToggle()
  })

  // Handle hover interactions
  useEffect(host, () => {
    if (!props.openOnHover.get()) return
    if (getDisabled()) return
    const store = getStore()
    if (!store) return

    const openDelay = props.delay.get()
    const closeDelay = props.closeDelay.get()

    return useHover(host, {
      openDelay,
      closeDelay,
      onOpen: () => store.requestOpenChange(true),
      onClose: () => store.requestOpenChange(false),
    })
  })

  useEffect(host, () => {
    getStore()?.setAnchorElement(host)
  })

  useAriaExpanded(host, getOpen)

  useAriaDisabled(host, getDisabled)

  const getAriaControls = computed(() => (getOpen() ? getPopupId() : undefined))
  useAriaControls(host, getAriaControls)
}

/**
 * `<aria-ui-popover-trigger>` custom element.
 *
 * Properties: {@link PopoverTriggerProps}
 *
 * Events: {@link PopoverTriggerEvents}
 */
export class PopoverTriggerElement extends defineCustomElement(
  setupPopoverTrigger,
  PopoverTriggerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverTriggerElement(): void {
  registerCustomElement('aria-ui-popover-trigger', PopoverTriggerElement)
}

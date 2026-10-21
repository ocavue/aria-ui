import { computed, createSignal } from '@aria-ui/core'
import type { ReferenceElement } from '@floating-ui/dom'

import { OpenChangeCompleteEvent } from './open-change-complete-event.ts'
import { OpenChangeEvent } from './open-change-event.ts'

export interface OverlayStore {
  getIsOpen(): boolean
  getIsHidden(): boolean
  setIsHidden(hidden: boolean): void
  requestOpenChange(open: boolean): void
  requestOpenToggle(): void
  dispatchOpenChangeComplete(open: boolean): void
  getPositionerId(): string
  setPositionerId(id: string): void
  getPopupId(): string
  setPopupId(id: string): void
  getAnchorElement(): ReferenceElement | undefined
  setAnchorElement(element: ReferenceElement | undefined): void
}

export function createOverlayStore(
  getOpen: () => boolean | null,
  setOpen: (open: boolean) => void,
  getDefaultOpen: () => boolean,
  getDisabled: () => boolean,
  dispatchOpenChangeEvent: (event: OpenChangeEvent) => void,
  dispatchOpenChangeCompleteEvent?: (event: OpenChangeCompleteEvent) => void,
): OverlayStore {
  const anchorElement = createSignal<ReferenceElement | undefined>(undefined)
  const positionerId = createSignal<string>('')
  const popupId = createSignal<string>('')
  const { get: getIsHidden, set: setIsHidden } = createSignal(false)

  const getIsOpen = computed((): boolean => {
    const canOpen = !getDisabled() && anchorElement.get()
    const openValue = getOpen() ?? getDefaultOpen()
    return canOpen ? openValue : false
  })

  // The root receives `openChange` before the open state changes. Canceling
  // the event stops the change.
  const requestOpenChange = (open: boolean) => {
    if (getDisabled()) return
    const event = new OpenChangeEvent(open)
    dispatchOpenChangeEvent(event)
    if (event.defaultPrevented) return
    setOpen(open)
  }

  const requestOpenToggle = () => {
    requestOpenChange(!getIsOpen())
  }

  const dispatchOpenChangeComplete = (open: boolean) => {
    dispatchOpenChangeCompleteEvent?.(new OpenChangeCompleteEvent(open))
  }

  return {
    getIsOpen,
    getIsHidden,
    setIsHidden,
    requestOpenChange,
    requestOpenToggle,
    dispatchOpenChangeComplete,
    getPositionerId: positionerId.get,
    setPositionerId: positionerId.set,
    getPopupId: popupId.get,
    setPopupId: popupId.set,
    getAnchorElement: anchorElement.get,
    setAnchorElement: anchorElement.set,
  }
}

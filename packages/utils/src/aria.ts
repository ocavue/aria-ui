import type { HostElement } from '@aria-ui/core'
import { useEffect } from '@aria-ui/core'

export function useAriaDisabled(host: HostElement, getAriaDisabled: () => boolean): VoidFunction {
  return useEffect(host, () => {
    host.ariaDisabled = getAriaDisabled() ? 'true' : null
  })
}

export function useAriaExpanded(
  host: HostElement,
  getAriaExpanded: () => boolean | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaExpanded = getAriaExpanded()
    host.ariaExpanded = ariaExpanded === true ? 'true' : ariaExpanded === false ? 'false' : null
  })
}

export function useAriaControls(
  host: HostElement,
  getAriaControls: () => string | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaControls = getAriaControls()
    if (ariaControls) {
      host.setAttribute('aria-controls', ariaControls)
    } else {
      host.removeAttribute('aria-controls')
    }
  })
}

export function useAriaDescribedBy(
  host: HostElement,
  getAriaDescribedBy: () => string | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const ariaDescribedBy = getAriaDescribedBy()
    if (ariaDescribedBy) {
      host.setAttribute('aria-describedby', ariaDescribedBy)
    } else {
      host.removeAttribute('aria-describedby')
    }
  })
}

export function useAriaMultiselectable(
  host: HostElement,
  getMultiselectable: () => boolean,
): VoidFunction {
  return useEffect(host, () => {
    host.ariaMultiSelectable = getMultiselectable() ? 'true' : null
  })
}

export function useAriaOrientation(host: HostElement, getOrientation: () => string): VoidFunction {
  return useEffect(host, () => {
    host.setAttribute('aria-orientation', getOrientation())
  })
}

export function useAriaActivedescendant(
  host: HostElement,
  getActivedescendant: () => string | undefined,
): VoidFunction {
  return useEffect(host, () => {
    const id = getActivedescendant()
    if (id) {
      host.setAttribute('aria-activedescendant', id)
    } else {
      host.removeAttribute('aria-activedescendant')
    }
  })
}

export function useAriaSelected(host: HostElement, getSelected: () => boolean): VoidFunction {
  return useEffect(host, () => {
    host.ariaSelected = String(getSelected())
  })
}

type AriaHasPopup = 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false'

export function useAriaHasPopup(
  host: HostElement,
  getHasPopup: () => AriaHasPopup | undefined | null,
): VoidFunction {
  return useEffect(host, () => {
    setAriaHasPopup(host, getHasPopup())
  })
}

export function getAriaHasPopup(element: Element): AriaHasPopup | undefined | null {
  return element.getAttribute('aria-haspopup') as AriaHasPopup | undefined | null
}

export function setAriaHasPopup(element: Element, value: AriaHasPopup | undefined | null): void {
  if (value) {
    element.setAttribute('aria-haspopup', value)
  } else {
    element.removeAttribute('aria-haspopup')
  }
}

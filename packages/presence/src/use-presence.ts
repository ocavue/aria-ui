import {
  createSignal,
  useEffect,
  useEventListener,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"
import { getEventTarget } from "@zag-js/dom-query"

/**
 * @internal
 */
export function usePresence(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
): ReadonlySignal<boolean> {
  const visible = createSignal(open.peek())

  useEffect(element, () => {
    if (visible.get()) {
      show(element)
    } else {
      hide(element)
    }
  })

  useEffect(element, () => {
    if (open.get()) {
      visible.set(true)
    } else if (getAnimationName(element) === "none") {
      visible.set(false)
    }
  })

  useEventListener(element, "animationend", (event: AnimationEvent) => {
    if (
      getAnimationName(element).includes(event.animationName) &&
      getEventTarget(event) === element &&
      !open.peek()
    ) {
      visible.set(false)
    }
  })

  return visible
}

function getAnimationName(element: HTMLElement) {
  return getComputedStyle(element).animationName || "none"
}

function show(element: HTMLElement) {
  if (element.style.display === "none") {
    element.style.display = ""
  }
}

function hide(element: HTMLElement) {
  element.style.display = "none"
}

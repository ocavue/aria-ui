import {
  useEffect,
  useEventListener,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"

/**
 * @internal
 */
export function usePresence(
  element: ConnectableElement,
  present: ReadonlySignal<boolean>,
): void {
  useEffect(element, () => {
    const initialPresent = present.peek()
    if (initialPresent) {
      show(element)
    } else {
      hide(element)
    }
  })

  const handleAnimationEnd = (event: AnimationEvent) => {
    if (
      getAnimationName(element).includes(event.animationName) &&
      event.target === element &&
      !present.peek()
    ) {
      hide(element)
    }
  }

  useEffect(element, () => handlePresentChange(element, present.get()))
  useEventListener(element, "animationend", handleAnimationEnd)
}

function handlePresentChange(element: HTMLElement, present: boolean) {
  if (present) {
    show(element)
  } else {
    if (getAnimationName(element) === "none") {
      hide(element)
    }
  }
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

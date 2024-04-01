import {
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  useEventListener,
} from "@aria-ui/core"

/**
 * @internal
 */
export function usePresence(
  element: ConnectableElement,
  present: ReadonlySignal<boolean>,
): void {
  let currentAnimationName = "none"

  const show = () => {
    if (element.style.display === "none") {
      element.style.display = ""
    }
  }

  const hide = () => {
    element.style.display = "none"
  }

  useEffect(element, () => {
    const initialPresent = present.peek()
    if (initialPresent) {
      show()
    } else {
      hide()
    }
  })

  const handlePresentChange = (presentValue: boolean) => {
    const style = getComputedStyle(element)
    currentAnimationName = style.animationName || "none"

    if (presentValue) {
      show()
    } else {
      if (currentAnimationName === "none") {
        hide()
      }
    }
  }

  const handleAnimationEnd = (event: AnimationEvent) => {
    const isCurrentAnimation = currentAnimationName.includes(
      event.animationName,
    )
    if (
      isCurrentAnimation &&
      event.target === element &&
      present.peek() === false
    ) {
      hide()
    }
  }

  useEffect(element, () => {
    const presentValue = present.value

    const id = requestAnimationFrame(() => {
      if (present.peek() === presentValue) {
        handlePresentChange(presentValue)
      }
    })
    return () => cancelAnimationFrame(id)
  })

  useEventListener(element, "animationend", handleAnimationEnd)
}

import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"

/**
 * @internal
 *
 * Try to put this function near the end of the setup function, after other
 * functions that trigger animations.
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
      return
    }

    const animations = element.getAnimations()
    if (animations.length === 0) {
      visible.set(false)
      return
    }

    let canceled = false
    void Promise.allSettled(
      animations.map((animation) => animation.finished),
    ).then(() => {
      if (!canceled) {
        visible.set(false)
      }
    })

    return () => {
      canceled = true
    }
  })

  return visible
}

function show(element: HTMLElement) {
  if (element.style.display === "none") {
    element.style.display = ""
  }
}

function hide(element: HTMLElement) {
  element.style.display = "none"
}

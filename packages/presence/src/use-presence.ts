import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from "@aria-ui/core"

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
      return
    }

    const animations = element.getAnimations()
    if (animations.length === 0) {
      visible.set(false)
      return
    }

    let canceled = false
    Promise.all(animations.map((animation) => animation.finished)).then(() => {
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

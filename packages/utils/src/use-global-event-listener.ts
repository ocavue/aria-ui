import type { HostElement } from '@aria-ui/core'
import { onMount } from '@aria-ui/core'
import { Counter, DefaultMap } from '@ocavue/utils'

const eventListenerMap = /* @__PURE__ */ new DefaultMap<string, Counter<EventListener>>(
  () => new Counter<EventListener>(),
)
const abortControllerMap = /* @__PURE__ */ new Map<string, AbortController>()

function addEventListener(type: string) {
  cleanEventListener(type)
  const abortController = new AbortController()
  abortControllerMap.set(type, abortController)
  window.addEventListener(
    type,
    (event) => {
      const listeners = eventListenerMap.get(type)
      for (const listener of listeners.keys()) {
        listener(event)
      }
    },
    {
      capture: true,
      passive: true,
      signal: abortController.signal,
    },
  )
}

function cleanEventListener(type: string) {
  const controller = abortControllerMap.get(type)
  if (controller) {
    controller.abort()
    abortControllerMap.delete(type)
  }
}

export function useGlobalEventListener<K extends keyof WindowEventMap>(
  host: HostElement,
  type: K,
  listener: (event: WindowEventMap[K]) => void,
): VoidFunction {
  const eventListener = listener as EventListener

  return onMount(host, () => {
    const listeners = eventListenerMap.get(type)

    if (listeners.size === 0) {
      addEventListener(type)
    }
    listeners.increment(eventListener)

    return () => {
      const current = listeners.get(eventListener)
      if (current <= 1) {
        listeners.delete(eventListener)
      } else {
        listeners.decrement(eventListener)
      }
      if (listeners.size === 0) {
        cleanEventListener(type)
      }
    }
  })
}

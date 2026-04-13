import type { HostElement } from '@aria-ui/core'
import { onMount } from '@aria-ui/core'
import { DefaultMap } from '@ocavue/utils'

const eventListenerMap = new DefaultMap<string, Set<EventListener>>(() => new Set<EventListener>())
const abortControllerMap = new Map<string, AbortController>()

function addEventListener(type: string) {
  cleanEventListener(type)
  const abortController = new AbortController()
  abortControllerMap.set(type, abortController)
  window.addEventListener(
    type,
    (event) => {
      const listeners = eventListenerMap.get(type)
      for (const listener of listeners) {
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

export function useGlobalEventListener<K extends keyof HTMLElementEventMap>(
  host: HostElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
): VoidFunction {
  const eventListener = listener as EventListener

  return onMount(host, () => {
    const listeners = eventListenerMap.get(type)
    if (listeners.has(eventListener)) return
    listeners.add(eventListener)

    if (listeners.size === 1) {
      addEventListener(type)
    }

    return () => {
      listeners.delete(eventListener)
      if (listeners.size === 0) {
        cleanEventListener(type)
      }
    }
  })
}

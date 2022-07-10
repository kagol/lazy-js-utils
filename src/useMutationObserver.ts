import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import type { MutationObserverInit } from './types'
export function useMutationObserver(element: Element | string, callback: (...args: any[]) => void, options: MutationObserverInit = {}) {
  let mounted = false
  let stopped = false
  let stop: () => void

  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (isStr(element))
      element = document.querySelector(element as string) as Element || element
    if (!mounted && isStr(element))
      return mounted = true
    else if (isStr(element))
      throw new Error(`${element} is not a Element`)
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(element as Element, options)
    stop = () => mutationObserver.disconnect()
    if (stopped)
      stop()
  }
  return () => {
    if (!stop) {
      stopped = true
      return
    }
    stop?.()
  }
}

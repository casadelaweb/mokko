/** Dispatches custom event with given name and detail object */
export function throwEvent(element: HTMLElement, name: string, detail: object) {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: detail,
  })
  element.dispatchEvent(event)
}

export function isMediaAboveLaptop(): boolean {
  return window.matchMedia('(min-width: 1280px)').matches
}

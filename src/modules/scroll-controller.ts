import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export class scrollController {
  public isLocked: boolean
  private header: HTMLElement
  private scrollBarWidth: number

  constructor() {
    this.header = null
    this.scrollBarWidth = null
    this.isLocked = false

    this.listen()
  }

  public listen(): void {
    document.addEventListener('DOMContentLoaded', this.updateDynamicSettings)
    window.addEventListener('resize', this.updateDynamicSettings)
  }

  public lock(): void {
    const { documentElement: html, body, } = document
    disableBodyScroll(body)
    this.isLocked = true
    html.style.paddingRight = this.scrollBarWidth + 'px'

    if (this.header) {
      this.header.style.marginRight = this.scrollBarWidth + 'px'
      this.header.style.maxWidth = 'calc(100vw - ' + this.scrollBarWidth + 'px)'
    }
  }

  public unlock(): void {
    const { documentElement: html, body, } = document
    enableBodyScroll(body)
    this.isLocked = false
    html.style.paddingRight = ''

    if (this.header) {
      this.header.style.marginRight = ''
      this.header.style.maxWidth = ''
    }
  }

  public toggle(): void {
    if (this.isLocked) {
      this.unlock()
    } else {
      this.lock()
    }
  }

  private updateDynamicSettings(): void {
    const { documentElement: html, body, } = document
    this.scrollBarWidth = window.innerWidth - html.clientWidth
    this.header = body.querySelector('header')
  }
}

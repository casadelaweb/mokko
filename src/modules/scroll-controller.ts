import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export class scrollController {
  public header: HTMLElement
  public isLocked: boolean
  public scrollBarWidth: number

  constructor() {
    this.header = null
    this.scrollBarWidth = null
    this.isLocked = false
  }

  public init(): void {
    document.addEventListener('DOMContentLoaded', this.update)
    window.addEventListener('resize', this.update)
  }

  public lock(): void {
    const { documentElement: html, body, } = document
    disableBodyScroll(body)
    this.isLocked = true
    html.classList.add('locked')
    html.style.paddingRight = this.scrollBarWidth + 'px'

    if (this.header) {
      this.header.style.marginRight = this.scrollBarWidth + 'px'
      this.header.style.maxWidth = 'calc(100% - ' + this.scrollBarWidth + 'px)'
    }
  }

  public toggle(): void {
    if (this.isLocked) {
      this.unlock()
    } else {
      this.lock()
    }
  }

  public unlock(): void {
    const { documentElement: html, body, } = document
    enableBodyScroll(body)
    this.isLocked = false
    html.classList.remove('locked')
    html.style.paddingRight = ''

    if (this.header) {
      this.header.style.marginRight = ''
      this.header.style.maxWidth = ''
    }
  }

  public update(): void {
    const { documentElement: html, body, } = document
    this.scrollBarWidth = window.innerWidth - html.clientWidth
    this.header = body.querySelector('header')
    html.style.setProperty('--scrollbarWidth', this.scrollBarWidth + 'px')
  }
}

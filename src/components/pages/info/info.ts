import { globalScrollController } from 'src/scripts/global-scroll-controller'

class InfoAside {
  private header: HTMLElement
  private nav: HTMLElement
  private button: HTMLElement
  private list: HTMLElement
  private overlay: HTMLElement
  private selectors: {
    header: string,
    nav: string,
    button: string,
    list: string,
    overlay: string,
  }

  constructor() {
    this.selectors = {
      header: '.info-nav-header',
      nav: '.info-nav',
      button: '.info-nav-button',
      list: '.info-nav-list',
      overlay: '.info-nav-overlay',
    }
  }

  public init(): void {
    this.updateElements()
  }

  public activate(): void {
    this.header.classList.add('active')
    this.nav.classList.add('active')
    this.button.classList.add('active')
    this.list.classList.add('active')
    this.overlay.classList.add('active')
  }

  public deactivate(): void {
    this.header.classList.remove('active')
    this.nav.classList.remove('active')
    this.button.classList.remove('active')
    this.list.classList.remove('active')
    this.overlay.classList.remove('active')
  }

  private updateElements(): void {
    const body = document.body as HTMLElement

    this.header = body.querySelector(this.selectors.header)
    this.nav = body.querySelector(this.selectors.nav)
    this.button = body.querySelector(this.selectors.button)
    this.list = body.querySelector(this.selectors.list)
    this.overlay = body.querySelector(this.selectors.overlay)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document

  const aside = new InfoAside()
  aside.init()

  if (body.querySelector('.info-nav')) {
    const isInfoNavActive = false

    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target.closest('.info-nav-header')) {
        aside.activate()
      } else if (isInfoNavActive && !target.closest('.info-nav')) {
        aside.deactivate()
      } else if (target.closest('.info-nav-overlay')) {
        aside.deactivate()
      }
    })
  }
})

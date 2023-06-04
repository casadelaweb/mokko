import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { modals } from 'src/scripts/modals-instance'
import { menuElements, menuSelectors } from 'src/components/menu/menu.types'

class Menu {
  public elements: menuElements
  private readonly media: string
  private readonly selectors: menuSelectors

  constructor() {
    this.elements = {
      overlay: null,
      header: null,
      menu: null,
      buttonsDesktopClose: [],
      buttonDesktopOpen: null,
      buttonMobileOpen: null,
      buttonMobileClose: null,
    }
    this.selectors = {
      header: '.header',
      menu: '.menu',
      buttonDesktopOpen: '[data-menu=desktop-open]',
      buttonsDesktopClose: [
        'a',
        'button',
      ],
      buttonMobileOpen: '[data-menu=mobile-open]',
      buttonMobileClose: '[data-menu=mobile-close]',
      overlay: '[data-menu=overlay]',
    }
    this.media = '(min-width: 1280px)'
  }

  public init(): void {
    this.updateElements()
    this.updateMenuStyles()
    this.listen()
  }

  private open(): void {
    console.log(this)
    const { overlay, menu, } = this.elements

    overlay.classList.add('active')
    menu.classList.add('active')

    globalScrollController.update()
    globalScrollController.lock()
    modals.parameters.counter++
  }

  private close(): void {
    const { overlay, menu, } = this.elements

    overlay.classList.remove('active')
    menu.classList.remove('active')

    globalScrollController.update()
    globalScrollController.unlock()
    modals.parameters.counter--
  }

  private listen(): void {
    const { header, buttonsDesktopClose, buttonDesktopOpen, menu, } = this.elements
    const { selectors, } = this

    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target.closest(selectors.buttonMobileOpen)) this.open()
      if (target.closest(selectors.buttonMobileClose)) this.close()
      if (target.closest(selectors.overlay)) this.close()
    })

    buttonsDesktopClose.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        if (window.matchMedia(this.media).matches) menu.classList.remove('active')
      })
    })
    buttonDesktopOpen.addEventListener('mouseenter', () => {
      if (window.matchMedia(this.media).matches) {
        header.classList.add('hovered')
        menu.classList.add('active')
      }
    })
    menu.addEventListener('mouseleave', () => {
      if (window.matchMedia(this.media).matches) menu.classList.remove('active')
    })
    window.addEventListener('resize', () => {
      this.updateElements()
      this.updateMenuStyles()
    })
  }

  private updateElements(): void {
    const { body, } = document
    const { selectors, } = this

    this.elements.overlay = body.querySelector(selectors.overlay)
    this.elements.header = body.querySelector(selectors.header)
    this.elements.menu = body.querySelector(selectors.menu)

    this.elements.buttonsDesktopClose = []
    selectors.buttonsDesktopClose.forEach((selector: string) => {
      const buttons: HTMLElement[] = Array.from(this.elements.header.querySelectorAll(selector))

      buttons.forEach((button: HTMLElement) => {

        if (!button.matches(selectors.buttonDesktopOpen) &&
          !button.matches(selectors.buttonMobileOpen) &&
          !button.matches(selectors.buttonMobileClose)) {
          this.elements.buttonsDesktopClose.push(button)
        }

      })
    })

    this.elements.buttonDesktopOpen = body.querySelector(selectors.buttonDesktopOpen)
    this.elements.buttonMobileClose = body.querySelector(selectors.buttonMobileClose)
    this.elements.buttonMobileOpen = body.querySelector(selectors.buttonMobileOpen)
  }

  private updateMenuStyles(): void {
    const { menu, header, } = this.elements

    if (window.matchMedia(this.media).matches) {
      menu.style.top = header.offsetHeight + 'px'
    } else {
      menu.style.top = '0px'
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Menu().init()
})

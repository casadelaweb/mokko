import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { modals } from 'src/scripts/modals-instance'
import { menuElements, menuSelectors } from 'src/components/menu/menu.types'
import { isMediaAboveLaptop } from 'src/scripts/helpers'

export class Menu {
  public elements: menuElements
  private readonly selectors: menuSelectors
  // eslint-disable-next-line no-unused-vars
  // private readonly onClick: (event) => void
  private readonly onResize: () => void

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
      overlay: '[data-modal-overlay]',
    }
    // this.onClick = this.handleClick.bind(this)
    this.onResize = this.handleResize.bind(this)
  }

  public init(): void {
    this.updateElements()
    this.updateMenuStyles()
    this.listen()
  }

  public open(): void {
    const { overlay, menu, } = this.elements

    overlay.classList.add('active')
    menu.classList.add('active')

    globalScrollController.update()
    globalScrollController.lock()
    modals.parameters.counter++
  }

  public close(): void {
    const { overlay, menu, } = this.elements

    overlay.classList.remove('active')
    menu.classList.remove('active')

    globalScrollController.update()
    globalScrollController.unlock()
    modals.parameters.counter--
  }

  private listen(): void {
    const { header, buttonsDesktopClose, buttonDesktopOpen, menu, } = this.elements

    // document.addEventListener('click', this.onClick)

    buttonsDesktopClose.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        if (isMediaAboveLaptop()) {
          menu.classList.remove('active')
        }
      })
    })
    buttonDesktopOpen.addEventListener('mouseenter', () => {
      if (isMediaAboveLaptop()) {
        header.classList.add('hovered')
        menu.classList.add('active')
      }
    })
    menu.addEventListener('mouseleave', () => {
      if (isMediaAboveLaptop()) {
        menu.classList.remove('active')
      }
    })
    window.addEventListener('resize', this.onResize)
  }

  private handleResize(): void {
    this.updateElements()
    this.updateMenuStyles()
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

    if (isMediaAboveLaptop()) {
      menu.style.top = header.offsetHeight + 'px'
    } else {
      menu.style.top = '0px'
    }
  }

  // private handleClick(event: MouseEvent): void {
  //   const target = event.target as HTMLElement
  //
  //   if (target.closest(this.selectors.buttonMobileOpen)) this.open()
  //   if (target.closest(this.selectors.buttonMobileClose)) this.close()
  //   if (target.closest(this.selectors.overlay)) this.close()
  // }

  private handleMouseEnter(event: MouseEvent): void {
  }

  private handleMouseLeave(event: MouseEvent): void {
  }
}

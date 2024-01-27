import { menu } from 'src/scripts/menu-instance'
import { isMediaAboveLaptop } from 'src/scripts/helpers'

class Header {
  public header: HTMLElement
  private headerHeight: number
  private isPageIndex: boolean
  private readonly onResize: (event?: Event) => void
  private readonly onScroll: (event?: Event) => void

  constructor() {
    this.header = undefined
    this.headerHeight = undefined
    this.isPageIndex = undefined
    this.onResize = this.handleResize.bind(this)
    this.onScroll = this.handleScroll.bind(this)
  }

  public init(): void {
    this.updateElements()
    this.updateHeaderHeight()
    this.hoverHeader()
    this.updateListeners()
  }

  private updateListeners(): void {
    this.updateHeaderListeners()
    this.updateGlobalListeners()
  }

  private updateGlobalListeners(): void {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize, { passive: true, })
    window.addEventListener('scroll', this.onScroll, { passive: true, })
  }

  private handleResize(): void {
    this.updateHeaderHeight()
  }

  private handleScroll(): void {
    this.hoverHeader()
  }

  private updateElements(): void {
    const { body, } = document
    this.header = body.querySelector('.header') ?? body.querySelector('header')
    this.headerHeight = this.header.offsetHeight
    this.isPageIndex = body.getAttribute('data-page') === 'index'
  }

  private updateHeaderHeight(): void {
    this.headerHeight = this.header.offsetHeight

    const value = this.headerHeight + 'px'
    if (this.isPageIndex) {
      //value = '0px'
    } else {
      this.header.classList.add('active')
    }

    document.documentElement.style.setProperty('--headerHeight', value)

  }

  private hoverHeader(): void {
    const { scrollY, } = window

    if (scrollY > this.headerHeight) {
      this.header.classList.add('scrolled')
    } else {
      this.header.classList.remove('scrolled')
    }
  }

  private updateHeaderListeners(): void {
    this.header.addEventListener('mouseenter', () => {
      if (isMediaAboveLaptop()) {
        this.header.classList.add('hovered')
      }
    })
    this.header.addEventListener('mouseleave', () => {
      if (isMediaAboveLaptop() && !menu.elements.menu.matches('.active')) {
        this.header.classList.remove('hovered')
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Header().init()
}, {
  passive: true,
  once: true,
})

import { catalogElements, selectors } from 'src/components/catalog/catalog.types'

export class Catalog {
  private isDesktop: boolean
  private selectors: selectors
  private elements: catalogElements

  constructor() {
    this.selectors = {
      card: '[data-catalog=card]',
      slider: '[data-slider=catalog-card]',
      controls: '[data-catalog-card=controls]',
      buttons: {
        prev: '.swiper-button-prev',
        next: '.swiper-button-next',
      },
    }
    this.isDesktop = false
  }

  public init(): void {
    this.isDesktop = window.matchMedia('(min-width: 1280px)').matches
    this.elements = this.updateElements()
    this.listen()
  }

  private listen(): void {
    document.addEventListener('click', this.clickHandler.bind(this))
    this.updateListeners()
  }

  private clickHandler(event): void {
    const target = event.target as HTMLElement

    if (target.closest('[data-catalog-layout]')) {
      const button = target.closest('[data-catalog-layout]')
      const mode = button.getAttribute('data-catalog-layout')

      this.changeLayoutMode(mode)
    }

    if (target.closest(this.selectors.slider) && !this.isDesktop) {
      const card = target.closest(this.selectors.card)
      const controls = card.querySelector(this.selectors.controls)
      controls.classList.toggle('active')
    }
  }

  private updateListeners(): void {
    const { body, } = document

    const cards: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))
    cards.forEach((card: HTMLElement) => {
      card.removeEventListener('mouseenter', this.mouseEnterHandler)
      card.removeEventListener('mouseleave', this.mouseLeaveHandler)

      card.addEventListener('mouseenter', this.mouseEnterHandler.bind(this))
      card.addEventListener('mouseleave', this.mouseLeaveHandler.bind(this))
    })
  }

  private mouseEnterHandler(event): void {
    const card = event.target as HTMLElement
    const sizes: HTMLElement = card.querySelector(this.selectors.controls)
    const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
    const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

    sizes.classList.add('active')
    buttonPrev.classList.add('active')
    buttonNext.classList.add('active')
  }

  private mouseLeaveHandler(event): void {
    const card = event.target as HTMLElement
    const sizes: HTMLElement = card.querySelector(this.selectors.controls)
    const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
    const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

    sizes.classList.remove('active')
    buttonPrev.classList.remove('active')
    buttonNext.classList.remove('active')
  }

  private changeLayoutMode(mode: string): void {
    switch (mode) {
    case 'row':
      this.elements.layout.classList.add('mode-row')
      break
    default:
      this.elements.layout.classList.remove('mode-row')
      break
    }
  }

  private updateElements(): catalogElements {
    const { body, } = document

    const layout: HTMLElement = body.querySelector('[data-catalog=layout]')
    return { layout, }
  }
}

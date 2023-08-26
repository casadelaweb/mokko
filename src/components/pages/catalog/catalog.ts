import { iCard, iCatalogElements, iSelectors, iHooks } from './catalog.types'
import { isMediaAboveLaptop, throwEvent } from 'src/scripts/helpers'

export class Catalog {
  public elements: iCatalogElements | undefined
  public hooks: iHooks
  private isMediaAboveLaptop: boolean
  private readonly selectors: iSelectors
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event: MouseEvent) => void
  // eslint-disable-next-line no-unused-vars
  private readonly onMouseEnter: (event: MouseEvent) => void
  // eslint-disable-next-line no-unused-vars
  private readonly onMouseLeave: (event: MouseEvent) => void
  //eslint-disable-next-line no-unused-vars
  // private onDOMMutation: (event?) => any

  constructor(hooksCustom?: iHooks) {
    this.selectors = {
      card: '[data-catalog=card]',
      slider: '[data-slider=catalog-card]',
      controls: '[data-catalog-card=controls]',
      buttons: {
        prev: '.swiper-button-prev',
        next: '.swiper-button-next',
      },
    }
    this.isMediaAboveLaptop = false

    // cоздаем обертку для методов чтобы привязать контекст вызова
    // так эта хрень нормально работает с removeEventListener
    this.onClick = this.handleClick.bind(this)
    this.onMouseEnter = this.handleMouseEnter.bind(this)
    this.onMouseLeave = this.handleMouseLeave.bind(this)

    //if (hooksCustom) {
    //  this.hooks = { ...hooksCustom, }
    //  this.onDOMMutation = this.hooks.onDOMMutation.bind(this)
    //}
  }

  public init(): void {
    this.update()
    this.observeMutations()
  }

  public update(): void {
    this.isMediaAboveLaptop = isMediaAboveLaptop()
    this.elements = this.updateElements()
    this.listen()
  }

  private observeMutations(): void {
    const catalog: HTMLElement = document.body.querySelector('[data-catalog=layout]')
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          const element: HTMLElement = mutation.target
          if (element.matches(this.selectors.card) || element.matches('.catalog-cards')) {
            throwEvent(mutation.target, 'catalogDOMMutation')
            // this.update()
          }
        }
      })
    })

    observer.observe(catalog, {
      attributes: false,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false,
      childList: true,
      subtree: true,
    })
  }

  private updateMouseListeners(): void {
    const { body, } = document

    const cards: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))

    cards.forEach((card: HTMLElement) => {
      card.removeEventListener('mouseenter', this.onMouseEnter)
      card.removeEventListener('mouseleave', this.onMouseLeave)

      card.addEventListener('mouseenter', this.onMouseEnter)
      card.addEventListener('mouseleave', this.onMouseLeave)
    })
  }

  private listen(): void {
    this.updateClickListeners()
    this.updateMouseListeners()
  }

  private updateClickListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.closest('[data-catalog-layout]')) {
      const button = target.closest('[data-catalog-layout]')
      const mode = button.getAttribute('data-catalog-layout')

      this.changeLayoutMode(mode)
    }

    if (target.closest(this.selectors.slider) && !this.isMediaAboveLaptop) {
      const card = target.closest(this.selectors.card)
      const controls = card.querySelector(this.selectors.controls)
      controls.classList.toggle('active')
    }
  }

  private handleMouseEnter(event: MouseEvent): void {
    const card = event.target as HTMLElement

    if (this.isMediaAboveLaptop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes.classList.add('active')
      buttonPrev.classList.add('active')
      buttonNext.classList.add('active')

      //if (this.hooks) {
      //  const data = this.elements.cards.find((cardEl) => cardEl.card === card)
      //  this.hooks.afterMouseEnter(data)
      //}
    }
  }

  private handleMouseLeave(event: MouseEvent): void {
    const card = event.target as HTMLElement

    if (this.isMediaAboveLaptop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes.classList.remove('active')
      buttonPrev.classList.remove('active')
      buttonNext.classList.remove('active')

      //if (this.hooks) {
      //  const data = this.elements.cards.find((cardEl) => cardEl.card === card)
      //  this.hooks?.afterMouseLeave(data)
      //}
    }
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

  private updateElements(): iCatalogElements {
    const { body, } = document

    const header: HTMLElement = body.querySelector('.header')
    const layout: HTMLElement = body.querySelector('[data-catalog=layout]')
    const catalogHeaderDesktop: HTMLElement = body.querySelector('[data-catalog=header-desktop]')
    const cardsArray: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))
    const cards: iCard[] = cardsArray.map((card: HTMLElement): iCard => {
      const slider: HTMLElement = card.querySelector(this.selectors.slider)
      const controls: HTMLElement = card.querySelector(this.selectors.controls)
      const buttons: { prev: HTMLElement, next: HTMLElement } = {
        prev: card.querySelector(this.selectors.buttons.prev),
        next: card.querySelector(this.selectors.buttons.next),
      }
      return {
        card,
        slider,
        controls,
        buttons,
      }
    })

    return {
      header,
      layout,
      cards,
      catalogHeaderDesktop,
    }
  }
}

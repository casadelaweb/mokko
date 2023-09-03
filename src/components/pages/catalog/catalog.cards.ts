import { iCard, iCatalogElements, iSelectors } from './catalog.types'
import { isMediaAboveLaptop, throwEvent } from 'src/scripts/helpers'
import Swiper, { Navigation, A11y, Pagination, Mousewheel } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/a11y'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'

export class CatalogCards {
  public elements: iCatalogElements | undefined
  private isMediaAboveLaptop: boolean
  private readonly onCatalogModified: (event: Event) => void
  private readonly onClick: (event: MouseEvent) => void
  private readonly onMouseEnter: (event: MouseEvent) => void
  private readonly onMouseLeave: (event: MouseEvent) => void
  private readonly selectors: iSelectors
  private swiper: Swiper | Swiper[]

  constructor() {
    this.selectors = {
      catalogLayout: '[data-catalog=layout]',
      card: '[data-catalog=card]',
      slider: '[data-slider=catalog-card]',
      controls: '[data-catalog-card=controls]',
      buttons: {
        prev: '.swiper-button-prev',
        next: '.swiper-button-next',
      },
      buttonCatalogUpdate: '[data-catalog=update]',
    }
    this.isMediaAboveLaptop = false

    // cоздаем обертку для методов чтобы привязать контекст вызова
    this.onClick = this.handleClick.bind(this)
    this.onMouseEnter = this.handleMouseEnter.bind(this)
    this.onMouseLeave = this.handleMouseLeave.bind(this)
    this.onCatalogModified = this.handleCatalogModified.bind(this)
  }

  public init(): void {
    this.initSlider()
    this.update()
    this.updateListeners()
    this.observeMutations()
  }

  public update(): void {
    this.isMediaAboveLaptop = isMediaAboveLaptop()
    this.elements = this.updateElements()
    this.updateMouseListeners()
    this.updateSwiper()
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

  private handleCatalogModified(): void {
    this.update()
    console.log(this)
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.closest('[data-catalog-layout]')) {
      const button: HTMLElement = target.closest('[data-catalog-layout]')
      const mode = button.getAttribute('data-catalog-layout')

      this.changeLayoutMode(mode)
    }

    if (target.closest(this.selectors.slider) && !this.isMediaAboveLaptop) {
      const card = target.closest(this.selectors.card)
      const controls = card.querySelector(this.selectors.controls)
      controls.classList.toggle('active')
    }

    if (target.closest(this.selectors.buttonCatalogUpdate)) this.update()
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
    }
  }

  private initSlider(): void {
    this.swiper = new Swiper(this.selectors.slider, {
      modules: [
        Navigation,
        A11y,
        Pagination,
        Mousewheel,
      ],
      ...accessibilitySettings,
      loop: true,
      speed: 250,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 14,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        enabled: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        enabled: true,
      },
      mousewheel: false,
      breakpoints: {
        1280: {
          navigation: { enabled: true, },
          // pagination: { enabled: false, },
          mousewheel: { releaseOnEdges: true, },
        },
        1920: {
          navigation: { enabled: true, },
          // pagination: { enabled: false, },
          mousewheel: { releaseOnEdges: true, },
        },
      },
    })
  }

  private observeMutations(): void {
    if (this.elements.layout) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target instanceof HTMLElement) {
            const element: HTMLElement = mutation.target

            if (element.matches(this.selectors.card)) throwEvent(mutation.target, 'catalogModified')
            if (element.matches(this.selectors.card)) throwEvent(mutation.target, 'catalogModified')
          }
        })
      })

      observer.observe(this.elements.layout, {
        attributes: false,
        attributeOldValue: false,
        characterData: false,
        characterDataOldValue: false,
        childList: true,
        subtree: true,
      })
    }
  }

  private updateCatalogListeners(): void {
    document.removeEventListener('catalogModified', this.onCatalogModified)
    document.addEventListener('catalogModified', this.onCatalogModified)
  }

  private updateClickListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }

  private updateElements(): iCatalogElements {
    const { body, } = document

    const header: HTMLElement = body.querySelector('.header')
    const layout: HTMLElement = body.querySelector(this.selectors.catalogLayout)
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

  private updateListeners(): void {
    this.updateClickListeners()
    this.updateMouseListeners()
    this.updateCatalogListeners()
  }

  private updateMouseListeners(): void {
    this.elements.cards.forEach((data: iCard) => {
      const card = data.card
      card.removeEventListener('mouseenter', this.onMouseEnter)
      card.removeEventListener('mouseleave', this.onMouseLeave)

      card.addEventListener('mouseenter', this.onMouseEnter)
      card.addEventListener('mouseleave', this.onMouseLeave)
    })
  }

  private updateSwiper(): void {

    if (Array.isArray(this.swiper)) {
      this.swiper.forEach((slider: Swiper) => {
        slider.destroy(false, true)
        this.initSlider()
      })
    } else {
      this.swiper.destroy(false, true)
      this.initSlider()
      // this.swiper.update()
    }
  }
}

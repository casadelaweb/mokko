import { iCard, iCatalogElements, iSelectors } from './catalog.types'
import { isMediaAboveLaptop, throwEvent, getCurrentMedia } from 'src/scripts/helpers'
import Swiper from 'swiper'
import { Navigation, A11y, Pagination, Mousewheel } from 'swiper/modules'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'

export class CatalogCards {
  public elements: iCatalogElements | undefined
  private isMediaAboveLaptop: boolean
  private readonly onCatalogModified: (event: Event) => void
  private readonly onClick: (event: MouseEvent) => void
  private readonly onMouseEnter: (event: MouseEvent) => void
  private readonly onMouseLeave: (event: MouseEvent) => void
  private readonly onResize: (event: Event) => void
  private readonly selectors: iSelectors
  private swiper: Swiper | Swiper[] | undefined

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
      buttonCatalogModeAttribute: 'data-catalog-layout',
    }
    this.isMediaAboveLaptop = false
    this.swiper = undefined
    this.onClick = this.handleClick.bind(this)
    this.onMouseEnter = this.handleMouseEnter.bind(this)
    this.onMouseLeave = this.handleMouseLeave.bind(this)
    this.onCatalogModified = this.handleCatalogModified.bind(this)
    this.onResize = this.handleResize.bind(this)
  }

  public init(): void {
    this.isMediaAboveLaptop = isMediaAboveLaptop()
    this.elements = this.updateElements()
    this.updateCatalogHeaderHeight()
    this.updateMouseListeners()
    this.initSlider()
    this.updateListeners()
    this.observeMutations()
    this.updateLayoutMode()
  }

  public update(): void {
    this.isMediaAboveLaptop = isMediaAboveLaptop()
    this.elements = this.updateElements()
    this.updateCatalogHeaderHeight()
    this.updateMouseListeners()
    this.updateSwiper()
  }

  private handleResize(): void {
    this.updateLayoutMode()
  }

  private updateLayoutMode(): void {
    let mode: string = 'mode-combined'
    const buttonLayoutModeActive: HTMLElement = document.body.querySelector(`[${ this.selectors.buttonCatalogModeAttribute }].active`)
    if (localStorage.getItem('catalogLayoutMode')) {
      mode = localStorage.getItem('catalogLayoutMode')
    } else if (buttonLayoutModeActive) {
      mode = buttonLayoutModeActive.getAttribute(this.selectors.buttonCatalogModeAttribute)
    }
    this.changeLayoutMode(mode)
  }

  private changeLayoutMode(mode: string): void {
    const body = document.body as HTMLElement
    const buttons: HTMLElement[] = Array.from(
      body.querySelectorAll(`[${ this.selectors.buttonCatalogModeAttribute }]`)
    )
    buttons.forEach((button: HTMLElement) => {
      if (button.getAttribute(this.selectors.buttonCatalogModeAttribute) === mode) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })
    const media = getCurrentMedia()

    switch (mode) {
    case 'enlarged':
      this.elements.cards.forEach(({ card, }) => {
        card.classList.add('mode-enlarged')
      })
      break
    case 'compact':
      this.elements.cards.forEach(({ card, }) => {
        card.classList.remove('mode-enlarged')
      })
      break
    default:
      // по умолчанию комбинированный режим карточек
      this.elements.cards.forEach(({ card, }, index) => {
        const position = index + 1

        // для каждого первого элемента из 3, начиная с первого
        if (media === 'mobile' && position % 3 === 1) {
          card.classList.add('mode-enlarged')
        }
        // для каждых 2 элементов из 5, начиная с первого
        else if (media === 'tablet' && (position % 5 === 1 || position % 5 === 2)) {
          card.classList.add('mode-enlarged')
        }
        // для каждых 3 элементов из 7, начиная с первого
        else if ((media === 'tabletBg' || media === 'laptop' || media === 'desktop')
            && (position % 7 === 1 || position % 7 === 2 || position % 7 === 3)) {
          card.classList.add('mode-enlarged')
        }
        // для всех остальных
        else {
          card.classList.remove('mode-enlarged')
        }
      })
      break
    }

    localStorage.setItem('catalogLayoutMode', mode)
  }

  private handleCatalogModified(): void {
    this.update()
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    /** Режим отображения карточек в каталоге */
    if (target.closest(`[${ this.selectors.buttonCatalogModeAttribute }]`)) {
      const button: HTMLElement = target.closest(`[${ this.selectors.buttonCatalogModeAttribute }]`)
      const mode = button.getAttribute(this.selectors.buttonCatalogModeAttribute)

      this.changeLayoutMode(mode)
    }

    if (target.closest(this.selectors.slider) && !this.isMediaAboveLaptop) {
      const card = target.closest(this.selectors.card)
      const controls = card.querySelector(this.selectors.controls)
      controls?.classList.toggle('active')
    }

    if (target.closest(this.selectors.buttonCatalogUpdate)) this.update()
  }

  private handleMouseEnter(event: MouseEvent): void {
    const card = event.target as HTMLElement

    if (this.isMediaAboveLaptop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes?.classList.add('active')
      buttonPrev?.classList.add('active')
      buttonNext?.classList.add('active')
    }
  }

  private handleMouseLeave(event: MouseEvent): void {
    const card = event.target as HTMLElement

    if (this.isMediaAboveLaptop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes?.classList.remove('active')
      buttonPrev?.classList.remove('active')
      buttonNext?.classList.remove('active')
    }
  }

  private initSlider(): void {
    // если на странице нет ни одного слайдера
    if (!document.body.querySelector(this.selectors.slider)) {
      this.swiper = undefined
      return
    }

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
        // enabled: true,
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

  private updateCatalogHeaderHeight(): void {
    const header = this.elements.catalogHeaderDesktop

    if (!header) return

    const height: number = header ? 320 : header.offsetHeight
    document.documentElement.style.setProperty('--catalogHeaderHeight', height + 'px')
  }

  private updateCatalogListeners(): void {
    document.removeEventListener('catalogModified', this.onCatalogModified)
    document.addEventListener('catalogModified', this.onCatalogModified)
  }

  private updateGlobalListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
    window.removeEventListener('resize', this.onResize)
    window.addEventListener('resize', this.onResize)
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
    this.updateGlobalListeners()
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
    // если слайдера нет
    if (this.swiper === undefined) return

    if (Array.isArray(this.swiper)) {
      this.swiper.forEach((slider: Swiper) => {
        slider.destroy(false, true)
      })
    } else {
      this.swiper.destroy(false, true)
    }

    console.log(this)
  }
}

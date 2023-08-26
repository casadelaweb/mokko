import Swiper, { Navigation, A11y, Pagination, Mousewheel } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/a11y'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'
import { Catalog } from './catalog'
import { isMediaAboveLaptop } from 'src/scripts/helpers'
import './catalog.filters'
import { Details } from 'src/modules/details/details'
import { Select } from 'src/modules/select/select'

document.addEventListener('DOMContentLoaded', () => {
  //@ts-ignore
  const sliders: Swiper[] = new Swiper('[data-slider=catalog-card]', {
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
  const catalog = new Catalog()
  catalog.init()
  document.addEventListener('catalogDOMMutation', () => {
    sliders.forEach((slider) => slider.update())
    catalog.update()
  })

  const catalogHeader: HTMLElement = catalog.elements.catalogHeaderDesktop
  if (catalogHeader) {
    window.addEventListener('scroll', () => {
      const { scrollY, } = window

      if (scrollY > catalog.elements.header.offsetHeight) {
        catalogHeader.classList.add('scrolled')
      } else {
        catalogHeader.classList.remove('scrolled')
      }
    })
    if (isMediaAboveLaptop()) {
      catalogHeader.style.overflow = 'unset'
      catalogHeader.style.top = catalog.elements.header.offsetHeight + 'px'
    }
  }

  new Details({
    preferButtonIfExist: true,
    selectors: {
      details: '.catalog-filter',
      summary: '.catalog-filter-summary',
      button: '.catalog-filter-button',
      content: '.catalog-filter-body',
      scrollbars: { vertical: 'has-vertical-scrollbar', },
    },
    onlyUnderLaptop: true,
  }).init()
  new Select({
    selectors: {
      select: '.catalog-filter',
      current: '.catalog-filter-summary',
      value: '.catalog-filter-selected',
      button: '.catalog-filter-button',
      options: '.catalog-filter-body',
      option: '.catalog-filter-label',
    },
  }).init()
})

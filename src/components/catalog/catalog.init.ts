import Swiper, { Navigation, A11y, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/a11y'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'
import { Catalog } from 'src/components/catalog/catalog'

import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import './no-ui-slider.scss'

document.addEventListener('DOMContentLoaded', () => {
  const catalog = new Catalog()
  catalog.init()

  const { body, } = document

  const catalogHeader: HTMLElement = body.querySelector('[data-catalog=header-desktop]')
  if (catalogHeader) catalogHeader.style.overflow = 'unset'

  noUiSlider.create(body.querySelector('#prices'), {
    start: [
      0,
      100,
    ],
    connect: true,
    range: {
      'min': 0,
      'max': 100,
    },
  })

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (target.closest('.catalog-more')) {
      catalog.update()
    }
  })

  new Swiper('[data-slider=catalog-card]', {
    modules: [
      Navigation,
      A11y,
      Pagination,
    ],
    ...accessibilitySettings,
    loop: true,
    speed: 500,
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
    breakpoints: {
      1280: {
        navigation: { enabled: true, },
        pagination: { enabled: false, },
      },
      1920: {
        navigation: { enabled: true, },
        pagination: { enabled: false, },
      },
    },
  })
})

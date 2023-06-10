import Swiper, { Navigation, A11y, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/a11y'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'
import { Catalog } from 'src/components/catalog/catalog'

document.addEventListener('DOMContentLoaded', () => {
  const catalog = new Catalog()
  catalog.init()

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

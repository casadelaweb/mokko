import Swiper, { Navigation, A11y, Pagination, Mousewheel } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/a11y'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'
import { Catalog } from './catalog'
import { isMediaAboveLaptop } from 'src/scripts/helpers'
import './catalog.filters'

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('[data-slider=catalog-card]', {
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
        pagination: { enabled: false, },
        mousewheel: { releaseOnEdges: true, },
      },
      1920: {
        navigation: { enabled: true, },
        pagination: { enabled: false, },
        mousewheel: { releaseOnEdges: true, },
      },
    },
  })

  // let isHovering: boolean = false
  // const hooksCustom = {
  //   afterMouseEnter(data) {
  //     isHovering = true
  //     const currentSlider = catalogCardSlider.find((swiper) => swiper.el === data.slider)
  //
  //     setTimeout(() => {
  //       if (isHovering) currentSlider.mousewheel.enable()
  //     }, 1000)
  //   },
  //   afterMouseLeave(data) {
  //     isHovering = false
  //     const currentSlider = catalogCardSlider.find((swiper) => swiper.el === data.slider)
  //     currentSlider.mousewheel.disable()
  //   },
  // }
  const catalog = new Catalog()
  catalog.init()

  const catalogHeader: HTMLElement = catalog.elements.catalogHeaderDesktop

  if (catalogHeader && isMediaAboveLaptop()) {
    catalogHeader.style.overflow = 'unset'
    catalogHeader.style.top = catalog.elements.header.offsetHeight + 'px'
  }

  if (catalogHeader) {
    window.addEventListener('scroll', () => {
      const { scrollY, } = window

      if (scrollY > catalog.elements.header.offsetHeight) {
        catalogHeader.classList.add('scrolled')
      } else {
        catalogHeader.classList.remove('scrolled')
      }
    })
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-catalog=update]')) {
      catalog.update()
    }
  })
})

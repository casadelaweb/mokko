import Swiper, { Pagination, SwiperOptions } from 'swiper'
import 'swiper/scss'
import { CSSSelector } from 'swiper/types'

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.catalog-detail-gallery-slider' as CSSSelector, {
    enabled: true,
    slidesPerView: 1,
    modules: [ Pagination, ],

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: { 1024: { enabled: false, }, },
  } as SwiperOptions)
})

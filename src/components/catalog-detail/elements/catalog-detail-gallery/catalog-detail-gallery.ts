import Swiper, {Pagination} from 'swiper'
import 'swiper/scss'
// import 'swiper/scss/pagination'


document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.catalog-detail-gallery-slider', {
    enabled: true,
    slidesPerView: 1,
    modules: [
      Pagination
    ],

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {1024: {enabled: false,},},
  })
})

import Swiper from 'swiper'
import 'swiper/scss'
// import 'swiper/scss/pagination'


document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.catalog-detail-galery-slider', {
    enabled: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      768: {
        enabled: false,
      },
    },
  })
})

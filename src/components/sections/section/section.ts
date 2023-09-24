import Swiper from 'swiper'
import { Navigation, A11y, Autoplay } from 'swiper/modules'

import {
  accessibility as accessibilitySettings,
  autoplay as autoplaySettings,
  navigation as navigationSettings
} from 'src/scripts/swiper-settings'

document.addEventListener('DOMContentLoaded', () => {
  const sharedSettings = {
    ...navigationSettings,
    ...autoplaySettings,
    ...accessibilitySettings,
    modules: [Navigation, A11y, Autoplay,],
    speed: 500,
    grabCursor: true,
    slidesPerView: 2.05,
    spaceBetween: 7,
  }
  
  new Swiper('.section-layout', {
    ...sharedSettings,
    autoplay: { delay: 10000, },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1024: { slidesPerView: 3, },
      1280: { slidesPerView: 4, },
    },
  })
  
  new Swiper('.slider-small', {
    ...sharedSettings,
    autoplay: { delay: 5000, },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1024: { slidesPerView: 4, },
      1280: { slidesPerView: 5, },
      1920: { slidesPerView: 6, },
    },
  })
})

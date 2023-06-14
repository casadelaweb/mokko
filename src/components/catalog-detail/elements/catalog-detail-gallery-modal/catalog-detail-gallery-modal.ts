import Swiper, {Navigation, Pagination} from 'swiper'
import 'swiper/scss'
import {modals} from "src/scripts/modals-instance";


document.addEventListener('DOMContentLoaded', () => {
  const {body,} = document
  const galleryItems: HTMLElement[] = Array.from(body.querySelectorAll('.catalog-detail-gallery-item'))
  const catalogGalleryModalSLider: HTMLElement = body.querySelector('.catalog-detail-gallery-modal-slider .swiper-wrapper')


  galleryItems.forEach((galleryItem: HTMLElement) => {
    const galleryModalItem: HTMLElement = document.createElement('div')
    galleryModalItem.classList.add('swiper-slide')
    galleryModalItem.innerHTML = '<div class="catalog-detail-gallery-modal-item"></div>'

    galleryModalItem.children[0].append(galleryItem.children[0].cloneNode())


    catalogGalleryModalSLider.append(galleryModalItem)

  })

  new Swiper('.catalog-detail-gallery-modal-slider', {
    enabled: true,
    slidesPerView: 1,
    direction: 'vertical',
    modules: [Navigation, Pagination,],

    navigation: {
      nextEl: '.gallery-swiper-button-next',
      prevEl: '.gallery-swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  })

})

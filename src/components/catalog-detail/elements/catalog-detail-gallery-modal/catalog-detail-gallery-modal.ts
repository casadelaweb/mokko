import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper'
import 'swiper/scss'
import { modals } from 'src/scripts/modals-instance'
import { target } from 'nouislider'
import { CSSSelector } from 'swiper/types'


document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const catalogDetail: HTMLElement = body.querySelector('.catalog-detail')
  const galleryItems: HTMLElement[] = Array.from(body.querySelectorAll('.catalog-detail-gallery-item'))
  const catalogGalleryModalSlider: HTMLElement = body.querySelector('.catalog-detail-gallery-modal-slider .swiper-wrapper')

  galleryItems.forEach((galleryItem: HTMLElement, index: number) => {
    galleryItem.dataset.slideId = `${index}`
    const galleryModalItem: HTMLElement = document.createElement('div')
    galleryModalItem.classList.add('swiper-slide')
    galleryModalItem.innerHTML = '<div class="catalog-detail-gallery-modal-item"></div>'

    galleryModalItem.children[0].append(galleryItem.children[0].cloneNode())


    catalogGalleryModalSlider.append(galleryModalItem)

  })


  const swiperInstance: Swiper = new Swiper('.catalog-detail-gallery-modal-slider' as CSSSelector, {
    modules: [
      Navigation,
      Pagination,
    ],
    enabled: true,
    slidesPerView: 1,
    direction: 'vertical',
    navigation: {
      nextEl: '.gallery-swiper-button-next',
      prevEl: '.gallery-swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  } as SwiperOptions)


  if (catalogDetail) {
    catalogDetail.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('.catalog-detail-gallery-item')) {
        modals.activateModal(body.querySelector(('[data-modal=catalog-detail-gallery-modal]')))
        const item: HTMLElement = target.closest('.catalog-detail-gallery-item')
        swiperInstance.slideTo(+item.dataset.slideId, 0)
      }
    })
  }


})

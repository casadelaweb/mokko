import Swiper from 'swiper'
import { Navigation, Pagination, Mousewheel, A11y } from 'swiper/modules'
import { accessibility } from 'src/scripts/swiper-settings'
import { modals } from 'src/scripts/modals-instance'
import { CSSSelector, SwiperOptions } from 'swiper/types'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  const catalogDetail: HTMLElement = body.querySelector('.product')
  const galleryItems: HTMLElement[] = Array.from(body.querySelectorAll('.product-gallery-item'))
  const catalogGalleryModalSlider: HTMLElement = body.querySelector('.product-gallery-modal-slider .swiper-wrapper')
  
  galleryItems.forEach((galleryItem: HTMLElement, index: number) => {
    galleryItem.dataset.slideId = `${index}`
    const galleryModalItem: HTMLElement = document.createElement('div')
    galleryModalItem.classList.add('swiper-slide')
    galleryModalItem.innerHTML = '<div class="product-gallery-modal-item"></div>'
    galleryModalItem.children[0].append(galleryItem.children[0].cloneNode())
    catalogGalleryModalSlider.append(galleryModalItem)
  })
  
  const swiperInstance: Swiper = new Swiper('.product-gallery-modal-slider' as CSSSelector, {
    ...accessibility,
    modules: [
      Navigation,
      Pagination,
      Mousewheel,
      A11y,
    ],
    loop: true,
    enabled: true,
    slidesPerView: 1,
    direction: 'vertical',
    mousewheel: true,
    spaceBetween: 80,
    speed: 500,
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
  
  if(catalogDetail) {
    catalogDetail.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if(target.closest('.product-gallery-item')) {
        const modal: HTMLElement = body.querySelector('[data-modal=product-gallery-modal]')
        const item: HTMLElement = target.closest('.product-gallery-item')
        modals.activateModal(modal)
        swiperInstance.slideTo(+item.dataset.slideId, 0)
      }
    })
  }
  
})

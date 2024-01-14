// default styles reset
import 'restyle.css/dist/restyle.css'
import 'restyle.css/dist/checkboxes.css'
// no UI slider
import 'nouislider/dist/nouislider.css'
import 'src/styles/ui/noUISlider.scss'
// swiper
import 'swiper/scss'
import 'swiper/scss/a11y'
import 'swiper/scss/scrollbar'
// app styles
import 'src/styles/main.scss'
import 'src/components'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { Select } from 'src/modules/select/select'
import { Details } from 'src/modules/details/details'
import { Masks } from 'src/modules/masks/masks'
import { Calendar } from 'src/modules/calendar/calendar'
import { Stories } from 'src/modules/stories/stories'
import { createApp } from 'vue'
import notificationsQueue from 'src/modules/notificationsQueue/notificationsQueue.vue'
import 'src/assets/img/placeholder.jpg'
import { iServerResponse } from 'src/modules/notificationsQueue/notificationsQueue.types'

document.addEventListener('DOMContentLoaded', () => {
  globalScrollController.init()
  modals.init()
  new Select().init()
  new Details().init()
  new Masks().init()
  new Calendar().init()
  new Stories().init()


  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('.catalog-card-favourite')) {
      const button: HTMLElement = target.closest('.catalog-card-favourite')
      button.classList.add('_disabled')
      button.classList.add('_loading')

      setTimeout(() => {
        const customEvent: iServerResponse = new CustomEvent('serverResponse', {
          bubbles: true,
          detail: {
            status: 'success',
            action: {
              type: 'add',
              destination: 'favourite',
            },
            product: {
              id: `product${Math.random()}`,
              url: '/product',
              title: `Тестовое название продукта ${Math.random()}`,
              img: { url: '/assets/img/placeholder-product.jpeg', },
              size: '44 | M',
              colorClass: '_color',
            },
          },
        })
        button.dispatchEvent(customEvent)
      }, 1000)
    }
  })

  const el: HTMLElement = document.querySelector('#notifications-queue')
  if (el) {
    createApp(notificationsQueue).mount('#notifications-queue')
  }
}, { passive: true, })
